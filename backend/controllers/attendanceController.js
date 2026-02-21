const { Attendance } = require('../models');

exports.markDaily = async (req, res, next) => {
  try {
    const created = await Attendance.bulkCreate(req.body.records.map((r) => ({ ...r, recordedBy: req.user.id })));
    res.status(201).json(created);
  } catch (e) { next(e); }
};

exports.monthlyReport = async (req, res, next) => {
  try {
    const { sectionId } = req.query;
    const records = await Attendance.findAll({ where: { sectionId } });
    res.json(records);
  } catch (e) { next(e); }
};
