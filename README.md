# Fastify for Docker starter

This package is a starter kit for using Fastify with Docker for small short-lived functions.

You can clone with no history:

```bash
git clone --depth 1 https://github.com/migsar/fastify-docker-starter.git
```

Usually you will run this inside Docker and you don't need to run npm locally but you need a `package-lock.json` to be able to use [`npm ci`](https://docs.npmjs.com/cli/v6/commands/npm-ci) inside of the container.
