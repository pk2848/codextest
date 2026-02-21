module.exports = (sequelize, DataTypes) => sequelize.define('feeStructure', {
  classRoomId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(120), allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  frequency: { type: DataTypes.ENUM('monthly', 'quarterly', 'yearly', 'one-time'), allowNull: false }
});
