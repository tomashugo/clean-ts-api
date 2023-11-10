FROM node:20
WORKDIR /home/dev/clean-node-api
COPY ./package.json .
RUN npm install --omit=dev
