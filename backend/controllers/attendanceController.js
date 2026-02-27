const { Attendance, StudentProfile, Enrollment } = require('../models');

exports.markDaily = async (req, res, next) => {
  try {
    const created = await Attendance.bulkCreate(req.body.records.map((r) => ({ ...r, recordedBy: req.user.id })));
    res.status(201).json(created);
  } catch (e) { next(e); }
};

exports.rfidScan = async (req, res, next) => {
  try {
    const { rfidTag, sectionId } = req.body;
    if (!rfidTag) return res.status(400).json({ message: 'rfidTag is required' });

    const student = await StudentProfile.findOne({ where: { rfidTag } });
    if (!student) return res.status(404).json({ message: 'No student found for this RFID tag' });

    const today = new Date().toISOString().slice(0, 10);
    const existing = await Attendance.findOne({ where: { studentId: student.id, date: today } });
    if (existing) return res.status(409).json({ message: 'Attendance already recorded today', attendance: existing });

    const enrollment = await Enrollment.findOne({ where: { studentId: student.id } });
    const resolvedSectionId = sectionId || (enrollment ? enrollment.sectionId : null);
    if (!resolvedSectionId) return res.status(400).json({ message: 'Cannot determine section for student' });

    const attendance = await Attendance.create({
      studentId: student.id,
      sectionId: resolvedSectionId,
      date: today,
      status: 'present',
      recordedBy: req.user.id
    });
    res.status(201).json({ message: 'Attendance marked via RFID', attendance });
  } catch (e) { next(e); }
};

exports.monthlyReport = async (req, res, next) => {
  try {
    const { sectionId } = req.query;
    const records = await Attendance.findAll({ where: { sectionId } });
    res.json(records);
  } catch (e) { next(e); }
};
