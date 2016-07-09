'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   queryInterface.createTable('productCategory', {
     productId: {
       type: Sequelize.INTEGER,
       onDelete: 'CASCADE',
       allowNull: false,
       references: {
         model: 'products',
         key: 'id',
       },
     },
     categoryId: {
       type: Sequelize.INTEGER,
       allowNull: true,
       references: {
         model: 'categories',
         key: 'id',
       },
     },
     createdAt: {
       allowNull: false,
       type: Sequelize.DATE,
     },
     updatedAt: {
       allowNull: false,
       type: Sequelize.DATE,
     },
   });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
