FROM node:14.18.0-alpine as builder
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:latest as runner
COPY --from=builder /app/dist/client /usr/share/nginx/html

EXPOSE 80


