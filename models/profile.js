'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User)
    }
  };
  Profile.init({
    UserId: DataTypes.INTEGER,
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Full Name is required'
        },
        notNull: {
          msg: 'Full Name is required'
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Date of birth is required'
        },
        notNull: {
          msg: 'Date of birth is required'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      isNumeric: true,
      validate: {
        notEmpty: {
          msg: 'Phone Number is required'
        },
        notNull: {
          msg: 'Phone Number is required'
        },
        isNumeric: {
          msg: 'must be a phone number'
        }
      }
    },
    accountBalance: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};