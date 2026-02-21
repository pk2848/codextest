module.exports = (sequelize, DataTypes) => sequelize.define('activityLog', {
  userId: { type: DataTypes.INTEGER },
  action: { type: DataTypes.STRING(150), allowNull: false },
  metadata: { type: DataTypes.JSON },
  ipAddress: { type: DataTypes.STRING(64) }
}, { indexes: [{ fields: ['userId'] }, { fields: ['createdAt'] }] });
