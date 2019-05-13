Installation instructions
=========================

#### Creating Images
Run the following commands

Angular
-------
docker build -t readmore_angular ./docker/angular/

Flask
-----
docker build -t readmore_api ./docker/flask/

#### Creating Container
cd docker
docker-compose up --no-start


Access to database
==================

docker exec -ti readmore_db psql -U readmore