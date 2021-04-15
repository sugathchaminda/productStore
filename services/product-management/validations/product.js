import { Joi, Segments } from 'celebrate';

module.exports = {
  createProduct: {
    [Segments.BODY]: {
      product_name: Joi.string().trim().max(50).required().label('Product Name'),
      product_slug: Joi.string().trim().max(50).required().label('Product Slug'),
      sku: Joi.string().trim().required().label('SKU'),
      brand: Joi.string().label('Brand'),
    },
  },
};
