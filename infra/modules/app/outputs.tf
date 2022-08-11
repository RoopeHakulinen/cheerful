output "load_balancer_ip" {
  value = aws_lb.load_balancer.dns_name
}