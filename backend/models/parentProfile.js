module.exports = (sequelize, DataTypes) => sequelize.define('parentProfile', {
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  occupation: { type: DataTypes.STRING(100) }
});
