module.exports = (sequelize, DataTypes) => sequelize.define('studentProfile', {
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  admissionNo: { type: DataTypes.STRING(40), allowNull: false, unique: true },
  dateOfBirth: { type: DataTypes.DATEONLY },
  academicHistory: { type: DataTypes.JSON }
}, { indexes: [{ unique: true, fields: ['admissionNo'] }] });
