const { Exam, ExamMark } = require('../models');

const calcGrade = (percentage) => (percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : 'D');

exports.createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch (e) { next(e); }
};

exports.reportCard = async (req, res, next) => {
  try {
    const marks = await ExamMark.findAll({ where: { examId: req.params.examId, studentId: req.params.studentId } });
    const total = marks.reduce((acc, m) => acc + Number(m.marksObtained), 0);
    const max = marks.reduce((acc, m) => acc + Number(m.maxMarks), 0);
    const percentage = max ? (total / max) * 100 : 0;
    res.json({ marks, total, max, percentage, grade: calcGrade(percentage) });
  } catch (e) { next(e); }
};
