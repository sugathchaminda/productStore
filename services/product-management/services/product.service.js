import ErrorResponse from 'utils/errorResponse.util';
import {
  PRODUCT_ADDED,
  PRODUCT_NOT_FOUND,
  PRODUCT_DELETED,
  PRODUCT_UPDATED,
} from 'constants/messages.constant';
import models from '../models';

const Product = models.PRODUCT;

class ProductService {
  /** Get all products */
  async getAllProducts() {
    const products = await Product.findAll();

    const response = {
      success: true,
      data: products,
    };
    return response;
  }

  /** Get product by id */
  async getProductById(productId) {
    const product = await Product.findOne({
      where: { ProductId: productId },
    });

    if (!product) throw new ErrorResponse(PRODUCT_NOT_FOUND, 404);

    const response = {
      success: true,
      data: product,
    };

    return response;
  }

  /** Add product */
  async addProduct(productDto) {
    const savedProduct = await Product.create({
      ProductName: productDto.product_name,
      ProductSlug: productDto.product_slug,
      SKU: productDto.sku,
      Brand: productDto.brand,
    });

    const { ProductName, ProductSlug, SKU, Brand } = savedProduct;

    const response = {
      success: true,
      message: PRODUCT_ADDED,
      data: {
        ProductName: ProductName,
        ProductSlug: ProductSlug,
        SKU: SKU,
        Brand: Brand,
      },
    };

    return response;
  }

  /** Edit product by id */
  async editById(payload) {
    const product = await Product.findOne({
      where: { ProductId: payload.productId },
    });

    if (!product) throw new ErrorResponse(PRODUCT_NOT_FOUND, 404);

    await Product.update(
      { ProductName: payload.ProductName, ProductSlug: payload.ProductSlug, SKU: payload.SKU, Brand: payload.Brand },
      { where: { ProductId: payload.productId } },
    );

    const response = {
      success: true,
      message: PRODUCT_UPDATED,
    };

    return response;
  }

  /** Delete product */
  async deleteProduct(productId) {
    const product = await Product.findOne({
      where: { ProductId: productId },
    });

    if (!product) throw new ErrorResponse(PRODUCT_NOT_FOUND, 404);

    await Product.destroy({
      where: { ProductId: productId },
    });

    const response = {
      success: true,
      message: PRODUCT_DELETED,
    };

    return response;
  }
}

export default new ProductService();
