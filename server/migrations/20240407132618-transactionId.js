'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('DetailTransactions', 'TransactionId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Transactions',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('DetailTransactions', 'TransactionId', null)
  }
};
