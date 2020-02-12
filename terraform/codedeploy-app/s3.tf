resource "aws_s3_bucket" "deploy-bucket" {
  bucket = "microservices-deploy-${var.app-name}-dep"
}
