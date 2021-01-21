FROM node:14.15-alpine3.11
EXPOSE 3034
WORKDIR /opt/app
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src src
RUN npm ci
CMD ["node", "src/index.mjs"]
