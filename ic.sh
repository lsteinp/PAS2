#!/usr/bin/env bash

set -x
dir=/opt/docker/hubble

# build web
cd $dir/web
pwd
nvm use 8.9.3
rm -rf /opt/docker/hubble/api/web/build


npm install
ng build
ls $dir/api/web/build/
mv -f /opt/docker/hubble/web/build /opt/docker/hubble/api/web/build
cd $dir/api
ls -la $dir/api/web/build




