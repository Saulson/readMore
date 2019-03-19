#Python 3.7.2
FROM python:stretch

#Flask
RUN pip3 install Flask mysql-connector-python gunicorn

#Install supervisor
RUN apt-get update \
    && apt-get install -y supervisor \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /var/log/gunicorn/
WORKDIR /www/api

EXPOSE 8100

CMD ["service supervisor start"]