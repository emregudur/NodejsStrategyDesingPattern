#/bin/sh

sh ./build.sh

docker-compose down && 
docker-compose build && 
# docker-compose up -d &&
docker-compose up &&

exit