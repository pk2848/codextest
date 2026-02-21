const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Role = require('./role')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);
const ClassRoom = require('./classroom')(sequelize, DataTypes);
const Section = require('./section')(sequelize, DataTypes);
const Subject = require('./subject')(sequelize, DataTypes);
const TeacherProfile = require('./teacherProfile')(sequelize, DataTypes);
const StudentProfile = require('./studentProfile')(sequelize, DataTypes);
const ParentProfile = require('./parentProfile')(sequelize, DataTypes);
const Enrollment = require('./enrollment')(sequelize, DataTypes);
const Attendance = require('./attendance')(sequelize, DataTypes);
const Exam = require('./exam')(sequelize, DataTypes);
const ExamMark = require('./examMark')(sequelize, DataTypes);
const FeeStructure = require('./feeStructure')(sequelize, DataTypes);
const FeeInvoice = require('./feeInvoice')(sequelize, DataTypes);
const Payment = require('./payment')(sequelize, DataTypes);
const TimetableEntry = require('./timetableEntry')(sequelize, DataTypes);
const Notice = require('./notice')(sequelize, DataTypes);
const ActivityLog = require('./activityLog')(sequelize, DataTypes);
const RefreshToken = require('./refreshToken')(sequelize, DataTypes);

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

User.hasOne(TeacherProfile, { foreignKey: 'userId' });
TeacherProfile.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(StudentProfile, { foreignKey: 'userId' });
StudentProfile.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(ParentProfile, { foreignKey: 'userId' });
ParentProfile.belongsTo(User, { foreignKey: 'userId' });

ClassRoom.hasMany(Section, { foreignKey: 'classRoomId' });
Section.belongsTo(ClassRoom, { foreignKey: 'classRoomId' });

TeacherProfile.hasMany(ClassRoom, { foreignKey: 'classTeacherId', as: 'classTeacherAssignments' });
ClassRoom.belongsTo(TeacherProfile, { foreignKey: 'classTeacherId', as: 'classTeacher' });

StudentProfile.belongsToMany(Section, { through: Enrollment, foreignKey: 'studentId' });
Section.belongsToMany(StudentProfile, { through: Enrollment, foreignKey: 'sectionId' });
Enrollment.belongsTo(StudentProfile, { foreignKey: 'studentId' });
Enrollment.belongsTo(Section, { foreignKey: 'sectionId' });

Attendance.belongsTo(StudentProfile, { foreignKey: 'studentId' });
Attendance.belongsTo(Section, { foreignKey: 'sectionId' });
Attendance.belongsTo(User, { foreignKey: 'recordedBy' });

Exam.belongsTo(Section, { foreignKey: 'sectionId' });
ExamMark.belongsTo(Exam, { foreignKey: 'examId' });
ExamMark.belongsTo(StudentProfile, { foreignKey: 'studentId' });
ExamMark.belongsTo(Subject, { foreignKey: 'subjectId' });
ExamMark.belongsTo(User, { foreignKey: 'enteredBy' });

FeeStructure.belongsTo(ClassRoom, { foreignKey: 'classRoomId' });
FeeInvoice.belongsTo(StudentProfile, { foreignKey: 'studentId' });
FeeInvoice.belongsTo(FeeStructure, { foreignKey: 'feeStructureId' });
Payment.belongsTo(FeeInvoice, { foreignKey: 'invoiceId' });
Payment.belongsTo(User, { foreignKey: 'recordedBy' });

TimetableEntry.belongsTo(Section, { foreignKey: 'sectionId' });
TimetableEntry.belongsTo(TeacherProfile, { foreignKey: 'teacherId' });
TimetableEntry.belongsTo(Subject, { foreignKey: 'subjectId' });

Notice.belongsTo(User, { foreignKey: 'createdBy' });
ActivityLog.belongsTo(User, { foreignKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  Role,
  User,
  ClassRoom,
  Section,
  Subject,
  TeacherProfile,
  StudentProfile,
  ParentProfile,
  Enrollment,
  Attendance,
  Exam,
  ExamMark,
  FeeStructure,
  FeeInvoice,
  Payment,
  TimetableEntry,
  Notice,
  ActivityLog,
  RefreshToken
};
