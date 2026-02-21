module.exports = (sequelize, DataTypes) => sequelize.define('enrollment', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  sectionId: { type: DataTypes.INTEGER, allowNull: false },
  academicYear: { type: DataTypes.STRING(20), allowNull: false }
}, { indexes: [{ unique: true, fields: ['studentId', 'sectionId', 'academicYear'] }, { fields: ['sectionId'] }] });
