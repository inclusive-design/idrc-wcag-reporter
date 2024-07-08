FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN apk add --no-cache git weasyprint

RUN npm install

COPY . ./

RUN npm run build

FROM caddy:2.8

COPY --from=builder /app/_site /usr/share/caddy
