const { TimetableEntry } = require('../models');
const { hasConflict } = require('../services/timetableService');

exports.create = async (req, res, next) => {
  try {
    if (await hasConflict(req.body)) return res.status(409).json({ message: 'Timetable conflict detected' });
    const entry = await TimetableEntry.create(req.body);
    res.status(201).json(entry);
  } catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const rows = await TimetableEntry.findAll({ where: { sectionId: req.query.sectionId } });
    res.json(rows);
  } catch (e) { next(e); }
};
