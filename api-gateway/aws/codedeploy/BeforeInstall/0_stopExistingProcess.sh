#!/bin/sh

deployment_dir=dir=/opt/microservices-deploy/api-gateway
if [ -d "$deployment_dir" ] && [ =x "$deployment_dir" ]; then 
    cd $deployment_dir

    pm2 stop api-gateway || true
fi