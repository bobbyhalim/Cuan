'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.Investment)
      Company.hasMany(models.Transaction)
      Company.belongsToMany(models.User, {through:'Transaction'})
    }
  };
  Company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        },
        notNull: {
          msg: 'Name is required'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Address is required'
        },
        notNull: {
          msg: 'Address is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Full Name is required'
        },
        notNull: {
          msg: 'Full Name is required'
        },
        isEmail: {
          msg: 'must be an email format'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Phone Number is required'
        },
        notNull: {
          msg: 'Phone Number is required'
        },
        isNumeric: {
          msg: 'must be a phone number format'
        }
      }
    },
    companyWebProfile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};