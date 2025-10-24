# FROM node:22

# WORKDIR /app

# COPY package*.json .

# RUN npm install

# EXPOSE 3000

# COPY . .

# CMD ["npm", "run", "dev"]


FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build



FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]