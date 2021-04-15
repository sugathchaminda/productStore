/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../server';

// eslint-disable-next-line no-undef
describe('Create New Product end point', () => {
  // eslint-disable-next-line no-undef
  it('should create a new product', async () => {
    const res = await request(app).post('/api/v1/products')
      .send({
        product_name: 'testProd1',
        product_slug: 'testProdSlug',
        sku: 'testProdSKU',
        brand: 'testProdBrand',
      });
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      message: 'Product created successfully',
      success: true,
      data: {
        ProductName: 'testProd1',
        ProductSlug: 'testProdSlug',
        SKU: 'testProdSKU',
        Brand: 'testProdBrand'
    }
    });
  });
});

// eslint-disable-next-line no-undef
describe('Get All Products', () => {
  // eslint-disable-next-line no-undef
  it('should create a new product', async () => {
    const res = await request(app).get('/api/v1/products')
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toEqual(200);
  });
});

// eslint-disable-next-line no-undef
describe('Get Product By ID', () => {
  // eslint-disable-next-line no-undef
  it('should get return 404', async () => {
    const res = await request(app).get('/api/v1/products/9999')
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({
      success: false,
      error: 'Product not found'
    });
  });
});
