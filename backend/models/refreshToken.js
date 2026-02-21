module.exports = (sequelize, DataTypes) => sequelize.define('refreshToken', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING(500), allowNull: false, unique: true },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  revoked: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { indexes: [{ fields: ['userId'] }, { unique: true, fields: ['token'] }] });
