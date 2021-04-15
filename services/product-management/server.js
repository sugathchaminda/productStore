/* eslint-disable no-unused-vars */
import express from 'express';
import colors from 'colors';
import { errors } from 'celebrate';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import config from 'config';
import log from 'utils/logger.util';
import { graphqlHTTP } from 'express-graphql';
import initialize from './initialize';
import { SERVER_STARED } from './constants/messages.constant';
import graphqlSchema from './graphql/schema';
import graphqlResolver from './graphql/resolvers';

const app = express();
initialize(app);

// graph ql configuration
app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true,
  formatError(err) {
    if (!err.originalError) {
      return err;
    }

    const { data } = err.originalError;
    const message = err.message || 'An error occured';
    const code = err.originalError.code || 500;

    return { message, status: code, data };
  },
}));

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express Microservice for product management',
    contact: {
      name: 'Sugath Fernando',
    },
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing API definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
const PORT = config.port || 3000;
module.exports = app.listen(PORT, () => log.info(`${SERVER_STARED} | Mode:${process.env.NODE_ENV} | Port:${PORT}`.yellow.bold));

process.on('unhandledRejection', (ex) => {
  log.error(ex.message.red.bold);
});
