module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'categories',
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Category.belongsToMany(models.Product, {
          as: 'products',
          through: 'productCategory',
          foreignKey: 'categoryId',
        });
      },
    },
  });
  return Category;
};
