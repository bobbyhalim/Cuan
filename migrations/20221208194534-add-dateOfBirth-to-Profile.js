'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Profiles', 'dateOfBirth', {type: Sequelize.DATE})
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Profiles', 'dateOfBirth', {})
  }
};
