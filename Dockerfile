# Rebuild the source code only when needed
FROM node:16.15.1-slim AS builder
WORKDIR /docs
COPY . .

# RUN yarn build && yarn install --production --ignore-scripts --prefer-offline
RUN npm ci --legacy-peer-deps --force
RUN npm run build --legacy-peer-deps

FROM builder as runner

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

# CMD ["yarn", "start"]
# Use the DEV build to help us prep the docs
CMD ["npm", "run", "dev"]
