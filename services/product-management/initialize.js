import path from 'path';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import objectIdValidation from 'utils/objectId.util';
import routes from 'routes';
import bodyParser from 'body-parser';
import log from 'utils/logger.util';
import config from 'config';
import { ENVIRONMENTS } from 'enums';
import { limiterOptions } from 'constants/options.constant';
import { errorHandler } from 'middleware';
import models from './models';

export default (app) => {
// initialize sequelize
  models.sequelize
    .authenticate()
    .then(() => {
      log.info('Connected to the database');
    })
    .catch((err) => {
      log.info('Unable to connect to the database: ', err);
    });

  if (process.env.NODE_ENV === 'development') {
    models.sequelize.sync({ force: false });
  }
  app.use(helmet());
  app.use(hpp());
  app.use(cors({ origin: config.cors_urls }));
  app.use(rateLimit(limiterOptions));

  if (process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT) {
    app.use(morgan('dev'));
  }

  app.use(express.static(path.join(__dirname, 'res')));

  routes(app);
  objectIdValidation();
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(errorHandler);
};
