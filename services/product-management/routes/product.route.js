import express from 'express';
import { celebrate } from 'celebrate';
import {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
} from 'controllers/product.controller';

import validations from '../validations';

const router = express.Router();

/**
 * @swagger
 * /api/v1/products:
 *  get:
 *    description: Get All products
 *    responses:
 *      '200':
 *        description: A succesfull response
*/
router
  .route('/')
  .get(getAllProducts);

/**
 *@swagger
 *paths:
 *  /api/v1/products/{productId}:
 *    get:
 *      description: Get product from Id
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the product
 *      responses:
 *        '200':
 *          description: A succesfull response
*/
router
  .route('/:id')
  .get(getProductById);

/**
 *@swagger
 *paths:
 *  /api/v1/products:
 *    post:
 *      description: Create a product
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                product_name:
 *                  type: string
 *                product_slug:
 *                  type: string
 *                sku:
 *                  type: string
 *                brand:
 *                  type: string
 *              example:
 *                product_name: testProdName
 *                product_slug: testProdSlug
 *                sku: testSKU
 *                brand: testBrand
 *      responses:
 *        '201':
 *          description: A succesfull response
*/
router
  .route('/')
  .post([celebrate(validations.product.createProduct)], createProduct);

/**
 *@swagger
 *paths:
 *  /api/v1/products/{productId}:
 *    put:
 *      description: Update a product
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the product to edit
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                product_name:
 *                  type: string
 *                product_slug:
 *                  type: string
 *                sku:
 *                  type: string
 *                brand:
 *                  type: string
 *              example:
 *                product_name: testProdName1
 *                product_slug: testProdSlug1
 *                sku: testSKU1
 *                brand: testBrand1
 *      responses:
 *        '201':
 *          description: A succesfull response
*/
router
  .route('/:id')
  .put(editProduct);

/**
 *@swagger
 *paths:
 *  /api/v1/products/{productId}:
 *    delete:
 *      description: Delete a product
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the product to delete
 *      responses:
 *        '200':
 *          description: Successfully deleted
*/
router
  .route('/:id')
  .delete(deleteProduct);

export default router;
