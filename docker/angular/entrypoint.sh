#! /bin/bash

NODE=./node_modules

if [ ! -d $NODE ]; then
    npm install
    npm install bootstrap jquery popper
fi

exec ng serve --host 0.0.0.0