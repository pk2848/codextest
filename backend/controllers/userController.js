const { Op } = require('sequelize');
const { User, Role } = require('../models');

exports.createUser = async (req, res, next) => {
  try {
    const role = await Role.findOne({ where: { name: req.body.role } });
    const user = await User.create({ ...req.body, roleId: role.id, passwordHash: req.body.passwordHash || '$2a$12$temp' });
    res.status(201).json(user);
  } catch (e) { next(e); }
};

exports.listUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const offset = (page - 1) * limit;
    const q = req.query.q || '';
    const users = await User.findAndCountAll({
      where: q ? { [Op.or]: [{ firstName: { [Op.like]: `%${q}%` } }, { lastName: { [Op.like]: `%${q}%` } }, { email: { [Op.like]: `%${q}%` } }] } : {},
      include: [Role],
      limit,
      offset
    });
    res.json(users);
  } catch (e) { next(e); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.json(user);
  } catch (e) { next(e); }
};
