const { Notice } = require('../models');

exports.create = async (req, res, next) => {
  try {
    const notice = await Notice.create({ ...req.body, createdBy: req.user.id, publishedAt: new Date() });
    res.status(201).json(notice);
  } catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const notices = await Notice.findAll();
    res.json(notices);
  } catch (e) { next(e); }
};
