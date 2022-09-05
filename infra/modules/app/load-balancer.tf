resource "aws_lb" "load_balancer" {
  name               = "app-${var.environment}"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]
  subnets            = [aws_subnet.primary.id, aws_subnet.secondary.id]
}

resource "aws_lb_target_group" "cheerful" {
  name        = "app-target-group-${var.environment}"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  lifecycle {
    create_before_destroy = true
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
