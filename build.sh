#/bin/sh

cd api &&
yarn install &&
yarn build &&

cd .. &&

cd web &&

yarn &&
yarn build &&
cd ..

echo "ok"

exit