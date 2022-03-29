FROM node:16
WORKDIR /app

ENV NODE_OPTIONS=--max_old_space_size=2048
COPY package.json yarn.lock ./

RUN export NODE_ENV=production
RUN yarn

COPY . .
RUN yarn run prisma:generate

EXPOSE 3000
CMD ["yarn", "start"]
