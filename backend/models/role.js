module.exports = (sequelize, DataTypes) => sequelize.define('role', {
  name: { type: DataTypes.STRING(50), allowNull: false, unique: true }
}, { indexes: [{ unique: true, fields: ['name'] }] });
