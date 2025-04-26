FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma/schema.prisma ./prisma/

# Install git
RUN apk add --no-cache git

RUN npm ci

RUN npx prisma migrate dev

RUN npx prisma generate

COPY . ./

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
