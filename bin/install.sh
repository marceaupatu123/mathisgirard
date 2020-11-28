#!/usr/bin/env bash
set -e

# update instance
yum -y update

# TODO: install node

# install pm2 module globaly
npm install -g pm2
pm2 update