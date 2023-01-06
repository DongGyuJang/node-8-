'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Laundries', {
      laundryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      customerId: {
        type: Sequelize.BIGINT.UNSIGNED
      },
      supplierId: {
        type: Sequelize.BIGINT.UNSIGNED
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      photoURL: {
        type: Sequelize.STRING
      },
      request: {
        type: Sequelize.STRING
      },
      cellphone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Laundries');
  }
};