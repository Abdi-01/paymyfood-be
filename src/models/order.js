'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });

  order.associate = (models) => {
    order.hasMany(models.transaction, {foreignKey: 'transactionId'});
  }
  return order;
};