'use strict';
const { hashingPassword }= require('../helpers/bcrypt');
const {
  Model, Transaction
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile)
      User.hasMany(models.Transaction)
      // User.belongsToMany(Investment, {through:'Transaction'})
      // User.belongsToMany(Company, {through:'Transaction'})
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Username is required'
        },
        notNull: {
          msg: 'Username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        notNull: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'must be an email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        notNull: {
          msg: 'Password is required'
        },
        len: {
          args: [8],
          msg: 'Password must be at least 8 character' 
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate:(user,options) => {
        user.password = hashingPassword(user.password);
        user.role = "member";  
      }
      }
  });
  return User;
};