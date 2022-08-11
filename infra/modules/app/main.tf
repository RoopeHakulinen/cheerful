locals {
  top_level_domain   = "getcheerful.com"
  environment_domain = "${var.environment}.${local.top_level_domain}"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "primary" {
  vpc_id            = aws_vpc.main.id
  availability_zone = data.aws_availability_zones.available.names[0]
  cidr_block        = "10.0.2.0/24"
}

resource "aws_subnet" "secondary" {
  vpc_id            = aws_vpc.main.id
  availability_zone = data.aws_availability_zones.available.names[1]
  cidr_block        = "10.0.3.0/24"
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_lb" "load_balancer" {
  name               = "app-${var.environment}"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]
  subnets            = [aws_subnet.primary.id, aws_subnet.secondary.id]
}

resource "aws_lb_target_group" "cheerful" {
  name        = "cheerful-target-group-${var.environment}"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"
}


resource "aws_route53_record" "cheerful" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = local.environment_domain
  type    = "A"

  alias {
    name                   = aws_lb.load_balancer.dns_name
    zone_id                = aws_lb.load_balancer.zone_id
    evaluate_target_health = true
  }
}

resource "aws_lb_listener" "cheerful" {
  load_balancer_arn = aws_lb.load_balancer.id
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = aws_acm_certificate.cert.arn

  default_action {
    target_group_arn = aws_lb_target_group.cheerful.id
    type             = "forward"
  }
}

resource "aws_lb_listener" "redirect_http_to_https" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener_rule" "cheerful" {
  listener_arn = aws_lb_listener.cheerful.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.cheerful.id
  }

  condition {
    host_header {
      values = [local.environment_domain]
    }
  }
}

resource "aws_security_group" "lb" {
  name   = "cheerful-alb-security-group-${var.environment}"
  vpc_id = aws_vpc.main.id

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route" "cheerful_internet_access" {
  route_table_id         = aws_vpc.main.main_route_table_id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.gw.id
}

resource "aws_ecs_cluster" "cluster" {
  name = "application-${var.environment}"
}

resource "aws_ecs_task_definition" "cheerful" {
  family                   = "cheerful-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  task_role_arn            = aws_iam_role.task.arn
  cpu                      = 1024
  memory                   = 2048

  container_definitions = <<DEFINITION
[
  {
    "image": "strm/helloworld-http",
    "cpu": 1024,
    "memory": 2048,
    "name": "cheerful-app-${var.environment}",
    "networkMode": "awsvpc",
    "portMappings": [
      {
        "containerPort": 80,
        "hostPort": 80
      }
    ]
  }
]
DEFINITION
}

data "aws_iam_policy_document" "task_assume" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "task" {
  name               = "task-role-${var.environment}"
  assume_role_policy = data.aws_iam_policy_document.task_assume.json
}

resource "aws_security_group" "cheerful_task" {
  name   = "cheerful-task-${var.environment}"
  vpc_id = aws_vpc.main.id

  ingress {
    protocol        = "tcp"
    from_port       = 80
    to_port         = 80
    security_groups = [aws_security_group.lb.id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_ecs_service" "service" {
  name = "cheerful-${var.environment}"

  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.cheerful.arn

  desired_count  = 1
  propagate_tags = "TASK_DEFINITION"
  launch_type    = "FARGATE"

  force_new_deployment  = true
  wait_for_steady_state = true

  network_configuration {
    subnets          = [aws_subnet.primary.id, aws_subnet.secondary.id]
    security_groups  = [aws_security_group.cheerful_task.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.cheerful.id
    container_name   = "cheerful-app-${var.environment}"
    container_port   = 80
  }

  depends_on = [aws_lb_listener.cheerful]
}

resource "aws_acm_certificate" "cert" {
  domain_name               = local.environment_domain
  subject_alternative_names = ["*.${local.environment_domain}"]
  validation_method         = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

data "aws_route53_zone" "primary" {
  name = local.top_level_domain
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
  for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
    name   = dvo.resource_record_name
    record = dvo.resource_record_value
    type   = dvo.resource_record_type
  }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.primary.zone_id
}

resource "aws_acm_certificate_validation" "validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}