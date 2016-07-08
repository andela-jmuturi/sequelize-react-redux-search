'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   queryInterface.createTable('ProductCategory', {
     ProductId: {
       type: Sequelize.INTEGER,
       onDelete: 'CASCADE',
       allowNull: false,
       references: {
         model: 'Products',
         key: 'id',
       },
     },
     CategoryId: {
       type: Sequelize.INTEGER,
       allowNull: true,
       references: {
         model: 'Categories',
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
