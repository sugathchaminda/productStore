import { buildSchema } from 'graphql';

module.exports = buildSchema(`
    type Product {
        ProductId: ID!
        ProductName: String!
        ProductSlug: String!
        SKU: String!
        Brand: String!
    }
    type ProductData {
        products: [Product!]!
    }
    input ProductInputData {
        product_name: String!
        product_slug: String!
        sku: String!
        brand: String!
    }
    type RootQuery {
        hello: String
        products: ProductData!
    }
    type RootMutation {
        createProduct(productInput: ProductInputData): Product!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
