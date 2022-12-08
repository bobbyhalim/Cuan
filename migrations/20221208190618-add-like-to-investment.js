'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Investments', 'like', {type: Sequelize.INTEGER})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Investments', 'like', {})
  }
};
