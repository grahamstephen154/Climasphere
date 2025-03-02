FROM nginx:latest

WORKDIR /usr/share/nginx/html

# remove the default nginx index file
RUN rm -rf ./*

# copy the front end files into here
COPY public/ .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# expose the frontend port
EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
