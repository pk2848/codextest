module.exports = (sequelize, DataTypes) => sequelize.define('exam', {
  name: { type: DataTypes.STRING(120), allowNull: false },
  sectionId: { type: DataTypes.INTEGER, allowNull: false },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false }
});
