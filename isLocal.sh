#!/usr/bin/env bash

rm -rf /opt/docker/hubble/api
rm -rf /opt/docker/hubble/web
git clone --depth 1 --branch dev http://www.tools.ages.pucrs.br/Hublle/API.git /opt/docker/hubble/api
git clone --depth 1 --branch develop http://www.tools.ages.pucrs.br/Hublle/Front-angular.git /opt/docker/hubble/web
nvm use 10.15.3
cd /opt/docker/hubble/web
npm install
ng build

mv -f /opt/docker/hubble/web/dist /opt/docker/hubble/api/

cd /opt/docker/hubble/api

docker-compose down
docker-compose -f docker-compose.yml down

docker-compose up --build -d
docker-compose -f docker-compose-web.yml up --build -d

