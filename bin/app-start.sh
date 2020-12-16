#!/usr/bin/env bash
echo "starting jeeves"
cd /home/ec2-user/discord-bot
pm2 start main.js --node.args="--icu-data-dir=node_modules/full-icu" --name="jeeves"
echo "jeeves started"