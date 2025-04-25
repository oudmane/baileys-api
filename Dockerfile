FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install git
RUN apk add --no-cache git

COPY prisma/schema.prisma ./

RUN npm ci

RUN npx prisma migrate

RUN npx prisma generate

COPY . ./

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
