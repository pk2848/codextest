module.exports = (sequelize, DataTypes) => sequelize.define('examMark', {
  examId: { type: DataTypes.INTEGER, allowNull: false },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  marksObtained: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  maxMarks: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  grade: { type: DataTypes.STRING(4) },
  enteredBy: { type: DataTypes.INTEGER, allowNull: false }
}, { indexes: [{ unique: true, fields: ['examId', 'studentId', 'subjectId'] }] });
