FROM node:14-slim
WORKDIR /opt/api

COPY ./dist-server ./dist-server
COPY ./package.json ./package.json

RUN yarn install --frozen-lockfile

ENV NODE_ENV production
ENV PORT 3010

EXPOSE 3010

CMD ["yarn", "server"]