module.exports = (sequelize, DataTypes) => sequelize.define('user', {
  firstName: { type: DataTypes.STRING(100), allowNull: false },
  lastName: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
  phone: { type: DataTypes.STRING(20) },
  passwordHash: { type: DataTypes.STRING(255), allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  roleId: { type: DataTypes.INTEGER, allowNull: false }
}, { indexes: [{ unique: true, fields: ['email'] }, { fields: ['roleId'] }] });
