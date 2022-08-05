terraform {
  backend "s3" {
    bucket = "cheerful-terraform-state"
    key    = "dev"
    region = "eu-west-1"
  }
}