FROM node:22-alpine

WORKDIR /src

COPY package*.json /src/

RUN npm install

COPY . /src

EXPOSE 4000

CMD [ "npm", "run", "start" ]
