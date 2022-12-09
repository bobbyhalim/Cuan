'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Investment)
      // Transaction.belongsToMany(models.User)
      // Transaction.belongsToMany(models.Company)
    }
  };
  Transaction.init({
    InvestmentId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    CompanyId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Unit is required'
        },
        notNull: {
          msg: 'Unit is required'
        }
      }
    },
    amount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};