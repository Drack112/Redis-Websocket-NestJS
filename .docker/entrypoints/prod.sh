#!/bin/bash

if [ ! -f ".env" ]; then
    cp .env.example .env
fi

node /home/node/app/dist/src/main
