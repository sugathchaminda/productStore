/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import productRouter from '../../routes/product.route';

import initialize from '../../initialize';

process.env.NODE_CONFIG_DIR = '../../config';
jest.useFakeTimers();
jest.mock('../../routes/product.route');

const mockUserRoute = jest.mock('express', () => {
  // eslint-disable-next-line no-restricted-syntax
  // eslint-disable-next-line no-labels
  // eslint-disable-next-line no-unused-expressions
  () => jest.fn();
});

productRouter.route = mockUserRoute;

describe('Express App', () => {
  test('Should return valid express application', () => {
    expect(initialize).toBeInstanceOf(Function);
  });

  test('Should have product routes', () => {
    require('../../initialize');
    expect(mockUserRoute.mock.length).toBe(3);
  });
});
