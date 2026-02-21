module.exports = (sequelize, DataTypes) => sequelize.define('timetableEntry', {
  sectionId: { type: DataTypes.INTEGER, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  teacherId: { type: DataTypes.INTEGER, allowNull: false },
  dayOfWeek: { type: DataTypes.ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'), allowNull: false },
  startTime: { type: DataTypes.TIME, allowNull: false },
  endTime: { type: DataTypes.TIME, allowNull: false }
}, { indexes: [{ fields: ['sectionId', 'dayOfWeek'] }, { fields: ['teacherId', 'dayOfWeek'] }] });
