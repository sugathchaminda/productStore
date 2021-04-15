import express from 'express';

import products from './product.route';

export default (app) => {
  app.use(express.json());

  app.use('/api/v1/products', products);
};
