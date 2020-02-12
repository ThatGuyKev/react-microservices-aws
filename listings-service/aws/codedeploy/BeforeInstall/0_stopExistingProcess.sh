#!/bin/sh

deployment_dir=dir=/opt/microservices-deploy/listings-service
if [ -d "$deployment_dir" ] && [ =x "$deployment_dir" ]; then 
    cd $deployment_dir

    pm2 stop listings-service || true
fi