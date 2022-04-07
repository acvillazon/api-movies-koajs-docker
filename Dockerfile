FROM node:14
EXPOSE 8090

WORKDIR /app

COPY package*.json  ./

RUN npm install

COPY . .


CMD ["npm","start"]