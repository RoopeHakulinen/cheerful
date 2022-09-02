resource "aws_db_instance" "app" {
  allocated_storage         = 10
  engine                    = "postgres"
  engine_version            = "14.3"
  instance_class            = "db.t3.micro"
  db_name                   = "app"
  username                  = "app"
  password                  = random_password.password.result
  final_snapshot_identifier = "app-${var.environment}"
  backup_retention_period   = 7
}

resource "random_password" "password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}