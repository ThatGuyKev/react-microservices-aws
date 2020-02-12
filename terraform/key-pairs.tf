resource "aws_key_pair" "microservices-deploy-key" {
  key_name   = "microservices-deploy-key"
  public_key = file("./microservices-deploy.pem")
}
