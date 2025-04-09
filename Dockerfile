FROM node:18
WORKDIR /node/home/app
COPY . .
RUN npm install
CMD ["npm", "start"]