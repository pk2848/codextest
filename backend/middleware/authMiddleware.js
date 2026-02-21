const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { User, Role } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.jwt.accessSecret);
    const user = await User.findByPk(decoded.id, { include: [Role] });
    if (!user || !user.isActive) return res.status(401).json({ message: 'Invalid user' });

    req.user = { id: user.id, role: user.role.name, email: user.email };
    next();
  } catch (error) {
    next(error);
  }
};
