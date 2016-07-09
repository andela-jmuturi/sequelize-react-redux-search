module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Category.belongsToMany(models.Product, {
          as: 'products',
          through: 'ProductCategory',
          foreignKey: 'categoryId',
        });
      },
    },
  });
  return Category;
};
