'use strict';
const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = JSON.parse(fs.readFileSync('./data/dataInvestment.json')).map((el) => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    return queryInterface.bulkInsert('Investments', data)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Investments')
  }
};
