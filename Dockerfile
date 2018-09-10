FROM node:8

WORKDIR /home/node/app
ADD package.json yarn.lock ./
RUN yarn
ADD . ./
RUN yarn build

EXPOSE 3000
USER node
CMD [ "yarn", "start" ]
