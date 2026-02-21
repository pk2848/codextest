const { TeacherProfile, TimetableEntry, ExamMark } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const teachers = await TeacherProfile.findAll();
    res.json(teachers);
  } catch (e) { next(e); }
};

exports.getTimetable = async (req, res, next) => {
  try {
    const entries = await TimetableEntry.findAll({ where: { teacherId: req.params.teacherId } });
    res.json(entries);
  } catch (e) { next(e); }
};

exports.enterMarks = async (req, res, next) => {
  try {
    const mark = await ExamMark.create({ ...req.body, enteredBy: req.user.id });
    res.status(201).json(mark);
  } catch (e) { next(e); }
};
