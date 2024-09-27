#Build stage
FROM node:18 as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update && apt-get upgrade -y
RUN npm install
COPY . .
RUN npm run build


EXPOSE 3000
CMD ["npm", "start"]
