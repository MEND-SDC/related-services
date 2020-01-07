FROM node:10.17-alpine

RUN mkdir -p /src/app/related_services

WORKDIR /src/app

COPY . /src/app/related_services

RUN npm install

EXPOSE 3003

CMD node ./related_services/SDC/Server/server.js

