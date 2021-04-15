import { asyncHandler } from 'middleware';
import productService from 'services/product.service';

/** Get all products */
const getAllProducts = asyncHandler(async (req, res) => {
  const response = await productService.getAllProducts(req);

  res.status(200).json(response);
});

/** Get Product by id */
const getProductById = asyncHandler(async (req, res) => {
  const response = await productService.getProductById(req.params.id);
  res.status(200).json(response);
});

/** Create Product */
const createProduct = asyncHandler(async (req, res) => {
  const { body } = req;
  const response = await productService.addProduct(body);

  res.status(201).send(response);
});

/** Edit Product by id */
const editProduct = asyncHandler(async (req, res) => {
  const data = {
    ProductName: req.body.product_name,
    ProductSlug: req.body.product_slug,
    SKU: req.body.sku,
    Brand: req.body.brand,
    productId: req.params.id,
  };

  const response = await productService.editById(data);

  res.status(200).json(response);
});

/** Delete Product */
const deleteProduct = asyncHandler(async (req, res) => {
  const response = await productService.deleteProduct(req.params.id);
  res.json(response);
});

export {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
};
