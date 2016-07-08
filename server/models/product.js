module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Product.belongsToMany(models.Category, { through: 'ProductCategory' });
      },
    },
  });
  return Product;
};
