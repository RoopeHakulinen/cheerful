locals {
  top_level_domain   = "getcheerful.com"
  environment_domain = "${var.environment}.${local.top_level_domain}"
}