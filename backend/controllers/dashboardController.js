const { User, StudentProfile, TeacherProfile, FeeInvoice, Attendance } = require('../models');

exports.stats = async (req, res, next) => {
  try {
    const [users, students, teachers, pendingInvoices, todayAttendance] = await Promise.all([
      User.count(),
      StudentProfile.count(),
      TeacherProfile.count(),
      FeeInvoice.count({ where: { status: 'unpaid' } }),
      Attendance.count({ where: { date: new Date().toISOString().slice(0, 10) } })
    ]);
    res.json({ users, students, teachers, pendingInvoices, todayAttendance, role: req.user.role });
  } catch (e) { next(e); }
};
