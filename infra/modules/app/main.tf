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
  security_groups    = []
  subnets            = [aws_subnet.primary.id, aws_subnet.secondary.id]
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}