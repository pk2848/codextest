const { StudentProfile, Enrollment, Attendance } = require('../models');
const studentService = require('../services/studentService');

exports.create = async (req, res, next) => {
  try {
    const profile = await studentService.createStudent(req.body.userId, req.body);
    res.status(201).json(profile);
  } catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const result = await studentService.listStudents(Number(req.query.page || 1), Number(req.query.limit || 20), req.query.q || '');
    res.json(result);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    await StudentProfile.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) { next(e); }
};

exports.attendance = async (req, res, next) => {
  try {
    const records = await Attendance.findAll({ where: { studentId: req.params.id } });
    res.json(records);
  } catch (e) { next(e); }
};
