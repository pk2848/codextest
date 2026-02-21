module.exports = (sequelize, DataTypes) => sequelize.define('teacherProfile', {
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  employeeId: { type: DataTypes.STRING(40), allowNull: false, unique: true },
  qualification: { type: DataTypes.STRING(255) }
});
