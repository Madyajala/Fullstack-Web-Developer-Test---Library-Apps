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
      // define association here
      Transaction.belongsToMany(models.Book, {through: "DetailTransaction", foreignKey: 'BukuId'})
      Transaction.hasMany(models.History)
      Transaction.belongsTo(models.Student, {foreignKey: "NIM"})
    }
  }
  Transaction.init({
    NIM: DataTypes.INTEGER,
    return: DataTypes.DATE,
    loan: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  // Transaction.beforeCreate((transaksi, options) => {
  //   if (!transaksi.loan) {
  //     transaksi.loan = new Date();
  //   }
  //   const duaMinggu = 14 * 24 * 60 * 60 * 1000; // Satu minggu = 7 hari = 7 * 24 jam = 7 * 24 * 60 menit = 7 * 24 * 60 * 60 detik = 7 * 24 * 60 * 60 * 1000 milidetik
  //   transaksi.return = new Date(book.borrowedAt.getTime() + duaMinggu);
  // });

  return Transaction;
};