FROM node:14-alpine

WORKDIR /src

COPY package.json /src

RUN npm install --production

COPY . /src

EXPOSE 4000

CMD [ "npm", "run", "start" ]
