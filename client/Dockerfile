FROM node:15.9.0-buster AS builder

WORKDIR /src

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.19.7-alpine

COPY --from=builder /src/build /usr/share/nginx/html

RUN echo "server { listen 80; server_name localhost; location / { root /usr/share/nginx/html; try_files \$uri \$uri/ /index.html; index index.html index.htm; } }" > /etc/nginx/conf.d/default.conf

EXPOSE 80

RUN nginx
