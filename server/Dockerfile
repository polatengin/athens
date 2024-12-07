FROM node:22.12.0-alpine3.20

WORKDIR /src

COPY package*.json /src/

RUN npm install

COPY . /src

EXPOSE 4000

CMD [ "npm", "run", "start" ]
