import dotenv from 'dotenv';
import fastify from 'fastify';

// Do not look for .env file in prod
if (process.env.NODE_ENV !== 'production') {
  const dotenvConf = Object.assign(
    {},
    process.env.ENV_FILE ? { path: process.env.ENV_FILE } : {}, 
  );
  dotenv.config(dotenvConf);
}

// Assign envvars to constants
// const {} = process.env;

const defaultConf = {
  host: 'localhost',
  port: '3030',
};
const Strings = {
  SHUTDOWN_MESSAGE: 'Shutting down server!',
};
const Errors = {
  NO_DATA: 'No token was provided or payload was in the wrong format.',
  DEFAULT_ERROR: 'An error happened',
};
const { host, port } = Object.assign(
  {},
  defaultConf,
  // process.env,
  // {}, // Map from process env constants
);

class App {
  constructor({ host, port }) {
    const server = fastify({ logger: true })

    this.server = server
    this.host = host
    this.port = port

    this.init()
  }

  init() {
    const { server } = this
    // First and only route
    server.post('/', async (req, reply) => {
      const { headers } = req.body

      // if (!(headers && headers.authorization)) {
      //   return reply.code(400).send(new Error(Errors.NO_DATA))
      // }

      try {
        // Custom code here

        reply.code(200).send();
      } catch (error) {
        return reply.code(400).send(error)
      }
    })
  }

  async startServer() {
    const { port, server, host } = this;
    try {
      await server.listen(port, host);
    } catch (error) {
      server.log.error(Errors.DEFAULT_ERROR, error);
      process.exit(1);
    }
  }

  // Exit gracefully, useful to reduce docker-compose shutdown time
  exit() {
    const { server } = this;
    server.close().then(
      () => {
        server.log.info(Strings.SHUTDOWN_MESSAGE);
      },
      (error) => {
        server.log.error(Errors.DEFAULT_ERROR, error);
      }
    )
  }
}

const app = new App({ host, port })

app.startServer()

process.on('SIGTERM', () => {
  app.exit()
})
