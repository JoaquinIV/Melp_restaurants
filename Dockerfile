FROM node:18.16.1-alpine3.18

WORKDIR /usr/src/app

EXPOSE 3000

COPY . .

RUN npm install

RUN npm install -g apidoc

RUN apidoc -i src -o apidoc

ENTRYPOINT ["node", "src/server.js"]
