FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE ${PORT}

COPY entrypoint.sh /
RUN chmod +x entrypoint.sh
VOLUME ["/app/uploads"]

CMD ["./entrypoint.sh"]
