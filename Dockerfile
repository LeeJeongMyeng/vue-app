FROM node:latest as builder

WORKDIR /sample
COPY packge.json ./
RUN npm install
COPY . .
RUN npm run build

FROM ngifnx:latest
COPY --from=builder /sample/dist /app

EXPOSE 80

