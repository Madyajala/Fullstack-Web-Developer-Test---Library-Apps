'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailTransaction.belongsTo(models.Book, {foreignKey: 'BukuId'})
      DetailTransaction.belongsTo(models.Transaction)
    }
  }
  DetailTransaction.init({
    BukuId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
    transactionid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetailTransaction',
  });
  return DetailTransaction;
};