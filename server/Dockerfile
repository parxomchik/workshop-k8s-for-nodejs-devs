FROM node:12.18.2-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build
RUN npm prune --production
EXPOSE 3001
ENTRYPOINT ["node", "/app/build/index.js"]