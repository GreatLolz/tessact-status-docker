FROM node:alpine3.16
WORKDIR /tessact-status
COPY package*.json ./
RUN mkdir data
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]