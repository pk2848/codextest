module.exports = (sequelize, DataTypes) => sequelize.define('notice', {
  title: { type: DataTypes.STRING(180), allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false },
  targetRoles: { type: DataTypes.JSON, allowNull: false },
  publishedAt: { type: DataTypes.DATE, allowNull: false },
  createdBy: { type: DataTypes.INTEGER, allowNull: false }
});
