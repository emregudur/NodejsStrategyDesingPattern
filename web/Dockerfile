FROM node:14-slim
WORKDIR /opt/web

COPY ./package.json ./package.json
COPY ./build ./build

RUN yarn install --frozen-lockfile

ENV NODE_ENV production

EXPOSE 3000

CMD ["yarn", "start:serve"]