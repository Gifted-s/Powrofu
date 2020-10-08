FROM node:10
WORKDIR /SignUpService
COPY package.json /SignUpService
RUN npm install
COPY . /SignUpService
CMD node index.js
EXPOSE 4000
