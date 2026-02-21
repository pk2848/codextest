module.exports = (sequelize, DataTypes) => sequelize.define('subject', {
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  code: { type: DataTypes.STRING(20), allowNull: false, unique: true }
});
