module "app" {
  source        = "../../modules/app"
  environment   = var.environment
  client_id     = var.client_id
  client_secret = var.client_secret
}
