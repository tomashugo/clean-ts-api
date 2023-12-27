FROM node:20
WORKDIR /usr/src/clean-node-api
RUN npm install --omit=dev
