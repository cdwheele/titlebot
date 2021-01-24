FROM node:15

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

ADD public /usr/src/app/public
ADD main.js .


EXPOSE 3000
CMD ["node", "main.js"]
