#!/usr/bin/env bash
echo "starting jeeves"
cd /home/ec2-user/discord-bot
pm2 start --icu-data-dir=node_modules\\full-icu main.js --name="jeeves"
echo "jeeves started"