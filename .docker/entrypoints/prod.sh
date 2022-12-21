#!/bin/bash

if [ ! -f ".env" ]; then
    cp .env.example .env
fi

pnpm start:prod
