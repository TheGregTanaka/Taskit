FROM node:lts

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.2 -g --silent
COPY . ./

EXPOSE 8888

CMD [ "npm", "start"]
