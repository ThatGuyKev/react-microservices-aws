#!/bin/sh

deployment_dir=dir=/opt/microservices-deploy/listings-service
if [ -d "$deployment_dir" ] && [ =x "$deployment_dir" ]; then 
    rm -rf $deployment_dir
fi