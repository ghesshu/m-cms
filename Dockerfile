FROM node:22-alpine

# Install dependencies for Sharp (image processing)
RUN apk update && apk add --no-cache \
  build-base \
  gcc \
  autoconf \
  automake \
  zlib-dev \
  libpng-dev \
  nasm \
  bash \
  vips-dev \
  git

# ==========
# ENVIRONMENT VARIABLES
# ==========

# Node environment
ENV NODE_ENV=${NODE_ENV}

# --- Server ---
ENV HOST=${HOST}
ENV PORT=${PORT}

# --- Secrets ---
ENV APP_KEYS=${APP_KEYS}
ENV API_TOKEN_SALT=${API_TOKEN_SALT}
ENV ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}
ENV TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT}
ENV ENCRYPTION_KEY=${ENCRYPTION_KEY}

# --- Database ---
ENV DATABASE_CLIENT=${DATABASE_CLIENT}
ENV DATABASE_HOST=${DATABASE_HOST}
ENV DATABASE_PORT=${DATABASE_PORT}
ENV DATABASE_NAME=${DATABASE_NAME}
ENV DATABASE_USERNAME=${DATABASE_USERNAME}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV DATABASE_SSL=${DATABASE_SSL}
ENV DATABASE_SCHEMA=${DATABASE_SCHEMA}

WORKDIR /opt/

COPY package.json package-lock.json ./

RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install

ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .

RUN chown -R node:node /opt/app
USER node

RUN ["npm", "run", "build"]

EXPOSE 1337

CMD ["npm", "run", "develop"]