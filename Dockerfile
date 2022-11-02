FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 1200

 CMD ["node", "server.ts"]