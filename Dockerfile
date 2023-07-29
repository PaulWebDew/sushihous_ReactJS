FROM node:12-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]