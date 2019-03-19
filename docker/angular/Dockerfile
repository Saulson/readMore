FROM node:10.15-stretch

WORKDIR /www/ng

RUN npm install -g @angular/cli

EXPOSE 4200

COPY ./entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]

CMD [""]