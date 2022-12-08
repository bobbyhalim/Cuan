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
      // define association here
    }
  };
  Profile.init({
    UserId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    accountBalance: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};