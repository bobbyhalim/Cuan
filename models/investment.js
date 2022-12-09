'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Investment.belongsTo(models.Company)
      Investment.hasMany(models.Transaction)
      // Investment.belongsToMany(User,{through:'Transaction'})
    }

    get formatPrice () {
      return this.price.toLocaleString("id-ID", {style:"currency", currency:"IDR"});
    }

    static notif (data) {
        return Investment.findAll({
            attributes: [
              [sequelize.fn('MAX', sequelize.col('like')), "max"],
              [sequelize.fn('MIN', sequelize.col('like')), "min"]
            ]
        })
    }
  };
  Investment.init({
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
    investmentType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Investment Type is required'
        },
        notNull: {
          msg: 'Investment Type is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        },
        notNull: {
          msg: 'Description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Price is required'
        },
        notNull: {
          msg: 'Price is required'
        },
        min: 10000
      }
    },
    unitStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Unit Stock is required'
        },
        notNull: {
          msg: 'Unit Stock is required'
        },
        min: 10
      }
    },
    CompanyId: DataTypes.INTEGER,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Investment',
  });
  return Investment;
};