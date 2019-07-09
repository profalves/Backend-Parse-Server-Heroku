FROM node:alpine

WORKDIR /usr/docker

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]