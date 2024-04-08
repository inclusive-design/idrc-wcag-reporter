FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN apk add --no-cache git python3 py3-pip pango gcc musl-dev py3-wheel python3-dev libffi-dev zlib-dev jpeg-dev

RUN pip install weasyprint

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1.25.4-alpine

COPY --from=builder /app/_site /usr/share/nginx/html
