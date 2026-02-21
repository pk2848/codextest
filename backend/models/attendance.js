module.exports = (sequelize, DataTypes) => sequelize.define('attendance', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  sectionId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('present', 'absent', 'late', 'leave'), allowNull: false },
  recordedBy: { type: DataTypes.INTEGER, allowNull: false }
}, { indexes: [{ unique: true, fields: ['studentId', 'date'] }, { fields: ['sectionId', 'date'] }] });
