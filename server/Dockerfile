FROM ubuntu:hirsute

# Set noninteractive mode for apt-get
ENV DEBIAN_FRONTEND noninteractive

# Update
RUN apt-get update

# Install package for cache
RUN apt-get -y install supervisor software-properties-common logrotate curl
RUN curl -sL https://deb.nodesource.com/setup | bash - \
 && apt-get -y install nodejs python build-essential \
 && add-apt-repository ppa:nginx/stable && apt-get update \
 && apt-get -y install nginx-full \
 && echo "daemon off;" >> /etc/nginx/nginx.conf \
 && rm /etc/nginx/sites-enabled/default

# supervisor
ADD nginx-nodejs.conf /etc/supervisor/conf.d/nginx-nodejs.conf

ONBUILD RUN npm install -g pm2

# nodejs
ONBUILD ADD ./package.json ./package.json
ONBUILD RUN npm install
ONBUILD ADD ./server.ts ./server.ts

# nginx
ONBUILD ADD nginx/sites-enabled /etc/nginx/sites-enabled

# Run
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
