module.exports = (sequelize, DataTypes) => sequelize.define('feeInvoice', {
  invoiceNo: { type: DataTypes.STRING(40), allowNull: false, unique: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  feeStructureId: { type: DataTypes.INTEGER, allowNull: false },
  dueDate: { type: DataTypes.DATEONLY, allowNull: false },
  totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.ENUM('unpaid', 'partial', 'paid', 'overdue'), defaultValue: 'unpaid' }
});
