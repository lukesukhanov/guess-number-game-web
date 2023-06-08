FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY . $WORKDIR
EXPOSE 80/tcp