export default function (sequelize, DataTypes) {
  const product = sequelize.define(
    'PRODUCT',
    {
      ProductId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      ProductName: {
        type: DataTypes.STRING,
      },
      ProductSlug: {
        type: DataTypes.STRING,
      },
      SKU: {
        type: DataTypes.STRING,
      },
      Brand: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    },
  );

  return product;
}
