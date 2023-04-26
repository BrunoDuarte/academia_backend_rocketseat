# create docker file for this application (node version 18.15.0), using multi-stage build. The application is using prisma as ORM, so we need to generate the prisma client before running the application.
FROM node:18-alpine AS build
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /src
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /src/build ./dist
COPY --from=build /src/node_modules ./node_modules
EXPOSE 3333
RUN npx prisma generate
CMD [ "node", "dist/server.js" ]