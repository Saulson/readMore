#Python 3.7.2
FROM python:stretch

#Flask
RUN pip3 install Flask psycopg2-binary psycopg2 gunicorn

RUN mkdir /var/log/gunicorn/

COPY ./entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]

WORKDIR /www/api

EXPOSE 80

CMD [""]