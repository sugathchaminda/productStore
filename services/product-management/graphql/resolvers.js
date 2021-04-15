import validator from 'validator';
import models from '../models';

const Product = models.PRODUCT;

module.exports = {
  async createProduct({ productInput }) {
    const errors = [];

    if (validator.isEmpty(productInput.product_name) || !validator.isLength(productInput.product_name, { max: 50 })) {
      errors.push({
        message: 'Invalid Product Name',
      });
    }

    if (validator.isEmpty(productInput.product_slug) || !validator.isLength(productInput.product_slug, { max: 50 })) {
      errors.push({
        message: 'Invalid Product Slug',
      });
    }

    if (validator.isEmpty(productInput.sku)) {
      errors.push({
        message: 'Invalid SKU',
      });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const createdProduct = await Product.create({
      ProductName: productInput.product_name,
      ProductSlug: productInput.product_slug,
      SKU: productInput.sku,
      Brand: productInput.brand,
    });
    return {
      ProductName: createdProduct.ProductName,
      ProductSlug: createdProduct.ProductSlug,
      SKU: createdProduct.SKU,
      Brand: createdProduct.Brand,
    };
  },

  async products() {
    const products = await Product.findAll();
    return {
      products: products.map((p) => ({
        ProductName: p.ProductName,
        ProductSlug: p.ProductSlug,
        SKU: p.SKU,
        Brand: p.Brand,
      })),
    };
  },
};
