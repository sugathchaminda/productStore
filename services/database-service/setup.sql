/*****CREATING TABLES*/
CREATE TABLE PRODUCT (
  ProductId      INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  ProductName    VARCHAR(40)                    NOT NULL,
  ProductSlug    VARCHAR(40)                        NULL,
  SKU            VARCHAR(20)                    NOT NULL,
  Brand          VARCHAR(100)                       NULL,
  CreatedAt      VARCHAR(100)                       NULL,
  UpdatedAt      VARCHAR(100)                       NULL
)
  ENGINE = INNODB;

INSERT INTO PRODUCT (ProductName, ProductSlug, SKU, Brand, CreatedAt, UpdatedAt)
VALUES ('Motor Cycle', 'productslug', 'MC1', 'Honda', '2021-04-15', '2021-04-15');

DROP PROCEDURE IF EXISTS sp_GetProduct;
DELIMITER //
CREATE PROCEDURE sp_GetProduct()
  BEGIN
    SELECT * FROM PRODUCT;
  END //
DELIMITER ;

CALL sp_GetProduct();
