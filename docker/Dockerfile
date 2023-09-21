# Configuration for Node base image
ARG ALPINE_VERSION
ARG NODE_VERSION

FROM node:"${NODE_VERSION}-alpine${ALPINE_VERSION}"

# Metadata
LABEL maintainer="MapLight"

# User and Group for app isolation
ARG APP_UID=1069
ARG APP_USER=app
ARG APP_GID=1420
ARG APP_GROUP=app
ARG APP_DIR=/app

ENV SHELL /bin/bash

ARG PACKAGES="\
    autoconf \
    automake \
    bash \
    binutils \
    build-base \
    coreutils  \
    execline \
    findutils \
    git \
    grep \
    less \
    libstdc++ \
    libtool \
    man-pages \
    openssl \
    util-linux \
    "

# Install packages
RUN apk update && \
    apk upgrade && \
    apk add --no-cache ${PACKAGES}

# Configure Node and PATH
ENV NODE_MODULES_DIR "${APP_DIR}/node_modules"
ENV NODE_BIN_DIR "${NODE_MODULES_DIR}/.bin"
ENV PATH "${NODE_BIN_DIR}:${PATH}"

# Add custom app User and Group
RUN addgroup -S -g "${APP_GID}" "${APP_GROUP}" && \
    adduser -S -g "${APP_GROUP}" -u "${APP_UID}" "${APP_USER}"

# Create directories for the app code
RUN mkdir -p "${APP_DIR}" \
    "${APP_DIR}/tmp" \
    "${NODE_MODULES_DIR}" \
    "${NODE_BIN_DIR}"
RUN chown -R "${APP_USER}":"${APP_GROUP}" "${APP_DIR}" \
    "${NODE_MODULES_DIR}" \
    "${NODE_BIN_DIR}"

USER "${APP_USER}"

WORKDIR "${APP_DIR}"

# Commands will be supplied via `docker-compose`
CMD []
