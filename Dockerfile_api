FROM node:8

# copy code
WORKDIR /Hublle
COPY . /Hublle

RUN pwd
RUN ls -la

# Install project dependencies
RUN cp /usr/share/zoneinfo/Brazil/East /etc/localtime
RUN date
RUN npm i npm@latest -g
RUN npm install

# Cannot start api container before database is ready. This holds it for a while
RUN wget https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh -O wait-for-it.sh && chmod +x wait-for-it.sh

