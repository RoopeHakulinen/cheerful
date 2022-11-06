resource "aws_ecs_cluster" "cluster" {
  name = "application-${var.environment}"
}

data "aws_ecr_repository" "app" {
  name = "cheerful"
}

resource "aws_cloudwatch_log_group" "app" {
  name              = "app-logs-${var.environment}"
  retention_in_days = 7
}

resource "random_password" "jwt_signing_key" {
  length  = 32
  special = false
}

resource "aws_ecs_task_definition" "cheerful" {
  family                   = "cheerful-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  task_role_arn            = aws_iam_role.task.arn
  execution_role_arn       = aws_iam_role.execution.arn
  cpu                      = 256
  memory                   = 512

  container_definitions = <<DEFINITION
[
  {
    "image": "${data.aws_ecr_repository.app.repository_url}:latest",
    "cpu": 256,
    "memory": 512,
    "name": "cheerful-app-${var.environment}",
    "networkMode": "awsvpc",
    "portMappings": [
      {
        "containerPort": 3000,
        "hostPort": 3000
      }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "${aws_cloudwatch_log_group.app.name}",
        "awslogs-region": "eu-west-1",
        "awslogs-stream-prefix": "container"
      }
    },
    "environment": [
      {
        "name": "DATABASE_URL",
        "value": "postgresql://${aws_db_instance.app.username}:${aws_db_instance.app.password}@${aws_db_instance.app.address}:${aws_db_instance.app.port}/${aws_db_instance.app.db_name}?schema=public"
      },
      {
        "name": "JWT_SIGNING_KEY",
        "value": "${random_password.jwt_signing_key.result}"
      },
      {
        "name": "DOMAIN",
        "value": "${local.environment_domain}"
      }
    ],
    "secrets": [
      {
        "name": "CLIENT_ID",
        "valueFrom": "${aws_secretsmanager_secret.client_id.arn}"
      },
      {
        "name": "CLIENT_SECRET",
        "valueFrom": "${aws_secretsmanager_secret.client_secret.arn}"
      }
    ]
  }
]
DEFINITION
}

resource "aws_secretsmanager_secret" "client_id" {
  name = "${var.environment}-client-id"
}

resource "aws_secretsmanager_secret_version" "client_id" {
  secret_id     = aws_secretsmanager_secret.client_id.id
  secret_string = var.client_id
}

resource "aws_secretsmanager_secret" "client_secret" {
  name = "${var.environment}-client-secret"
}

resource "aws_secretsmanager_secret_version" "client_secret" {
  secret_id     = aws_secretsmanager_secret.client_secret.id
  secret_string = var.client_secret
}

resource "aws_iam_role" "task" {
  name               = "task-role-${var.environment}"
  assume_role_policy = data.aws_iam_policy_document.task_assume.json
}

resource "aws_iam_role" "execution" {
  name               = "task-execution-role-${var.environment}"
  assume_role_policy = data.aws_iam_policy_document.task_assume.json
}

data "aws_iam_policy_document" "task_execution_permissions" {
  statement {
    effect = "Allow"

    resources = [
      "*",
    ]

    actions = [
      "ecr:GetAuthorizationToken",
      "ecr:BatchCheckLayerAvailability",
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "secretsmanager:GetSecretValue"
    ]
  }
}

resource "aws_iam_role_policy" "task_execution" {
  name   = "task-execution-${var.environment}"
  role   = aws_iam_role.execution.id
  policy = data.aws_iam_policy_document.task_execution_permissions.json
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

resource "aws_iam_role_policy" "ecs_exec_inline_policy" {
  name   = "ecs-exec-permissions-${var.environment}"
  role   = aws_iam_role.task.id
  policy = data.aws_iam_policy_document.task_ecs_exec_policy.json
}

data "aws_iam_policy_document" "task_ecs_exec_policy" {
  statement {
    effect = "Allow"

    resources = ["*"]

    actions = [
      "ssmmessages:CreateControlChannel",
      "ssmmessages:CreateDataChannel",
      "ssmmessages:OpenControlChannel",
      "ssmmessages:OpenDataChannel"
    ]
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
    container_port   = 3000
  }

  depends_on = [aws_lb_listener.cheerful]
}
