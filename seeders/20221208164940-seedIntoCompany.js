'use strict';
const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = JSON.parse(fs.readFileSync('./data/dataCompany.json')).map((el) => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    return queryInterface.bulkInsert('Companies', data)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Companies')
  }
};
