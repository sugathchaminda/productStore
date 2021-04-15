## Running the entire application stack
Purpose on this to integrate the microservice architecture and communicate these with the rabbitmq. 
If you have docker-compose installed and docker running; it is really simple to spin up the entire application stack.

Make sure you are in the root directory of the repository where the docker-compose file is.
With docker application run in port 4000 with out docker you can run it on port 3000. 
If somehow got issue in connecting mysql container try to restart only the product-management-ms container

**docker-compose up** starts it and **docker-compose down** stops it

Example:

```
docker-compose build --no-cache
docker-compose up
docker-compose down

```

## Swager API endpoint
Docker graphql - http://localhost:4000/docs
If you are not using docker - http://localhost:3000/docs

## GraphQL endpoint
Docker graphql - http://localhost:4000/graphql
If you are not using docker - http://localhost:3000/graphql


```
ex - To get all products run the query in   http://localhost:4000/graphql
query{
  products {
    products {
      ProductName
      ProductSlug
      SKU
    }
  }
}
result - 
{
  "data": {
    "products": {
      "products": [
        {
          "ProductName": "Motor Cycle",
          "ProductSlug": "productslug",
          "SKU": "MC1"
        }
      ]
    }
  }
}

ex - To create new product run the mutation in   http://localhost:4000/graphql
mutation{
  createProduct(productInput: {
    product_name:"eee",
    product_slug: "graphqlslug",
    sku: "sku123",
    brand:"honda"
  })
  {
  	ProductName
    ProductSlug
  }
}

result - 
{
  "data": {
    "createProduct": {
      "ProductName": "eee",
      "ProductSlug": "graphqlslug"
    }
  }
}

```

## Run appplication without docker
* Define your mysql db configuration in config file in services/product-management/config.js (If your are not using docker)
```
cd services/product-management
yarn - install dependencies
yarn server:dev -  start the application
```


## Run unit tests
* Go to the  services/product-management and yarn test

```
cd services/product-management
yarn lint
```


## Working Features

Once you run the entire application stack using docker compose, you should be able access the public routes below:

Feature | Type | Route | Access
------------ | ------------- | ------------- | -------------
Get all products | GET | http://localhost:4000/api/v1/products | Public
Get a specific product | GET | http://localhost:4000/api/vi/products/:id | Public
Add a new product | POST | http://localhost:4000/api/v1/products | Public
Update an product | PUT | http://localhost:4000/api/v1/products/:id | Public
Delete an product | DELETE | http://localhost:4000/api/v1/products/:id | Public

You can run these end points from postman ot through the swagger API(http://localhost:4000/docs)


## Running the linter

Go to the respective service directory where the package.json is and run linter.

Eg: to run the tests for the product-management service

```
cd services/product-management
yarn lint
```

All services have adopted the eslint airbnb configuration. A strict linting policy has been followed to ensure consistent code is produced.


