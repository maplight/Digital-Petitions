# Digital-Petitions

# Docker Instructions

## Building

To build the image, run the following:

```sh
alpine_version=3.18 node_version=18.17.1 ./docker/build_image.sh
```

Once built, the image is used in the `docker-compose.yml` file as the
base image for the service(s). Make sure the image name is updated to
match the options entered during build.

## Environment

The Docker Compose configuration requires `env` files.

- `.env` to store default keys (and values) used to configure
various services and libraries.
- `.env.local` a git ignored file that provides a way to override values
from `.env` for local development.

Ensure the local file exists:

```sh
touch .env.local
```

## Installing

To install the node dependencies, run the following:

```sh
docker-compose run --rm app
```

## Running

To bring the `app` service up, run the following:

```sh
docker-compose up app
```

This will start the app with the `ng serve` command and maps port `4200`
to your local machine.
