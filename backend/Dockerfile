FROM node:14.16.1-alpine3.13

ADD . /app
WORKDIR /app

RUN npm install --only=production
EXPOSE 3000

CMD npm start