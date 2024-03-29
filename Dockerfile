FROM node:alpine

WORKDIR /app

COPY . .

EXPOSE 3005

CMD ["node", "server.mjs"]