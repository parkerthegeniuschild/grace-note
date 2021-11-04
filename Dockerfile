# Prebuild
FROM node:14.17-alpine3.13 as base
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY .babelrc ./
RUN yarn --frozen-lockfile
COPY ./src ./src
RUN yarn build

# Final build
FROM node:14.17-alpine3.13
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn --prod --frozen-lockfile
COPY --from=base /usr/src/app/dist ./dist
RUN apk add --no-cache openssl dumb-init
EXPOSE 5000
CMD ["dumb-init", "node", "./dist/index.js"]