module.exports = (sequelize, DataTypes) => sequelize.define('payment', {
  invoiceId: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  method: { type: DataTypes.ENUM('cash', 'card', 'bank_transfer', 'online'), allowNull: false },
  paidAt: { type: DataTypes.DATE, allowNull: false },
  referenceNo: { type: DataTypes.STRING(100) },
  recordedBy: { type: DataTypes.INTEGER, allowNull: false }
});
