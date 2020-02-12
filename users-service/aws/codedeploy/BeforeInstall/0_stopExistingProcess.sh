#!/bin/sh

deployment_dir=dir=/opt/microservices-deploy/users-service
if [ -d "$deployment_dir" ] && [ =x "$deployment_dir" ]; then 
    cd $deployment_dir

    pm2 stop users-service || true
fi