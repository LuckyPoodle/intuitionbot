FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Transpile TypeScript to JavaScript
RUN npm run build

RUN npm prune --production

CMD [ "npm", "start" ]

EXPOSE 8080


