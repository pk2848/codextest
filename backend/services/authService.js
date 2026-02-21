const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { Op } = require('sequelize');
const { User, Role, RefreshToken, ActivityLog } = require('../models');
const { signAccessToken, signRefreshToken } = require('../utils/jwt');
const { sendPasswordResetEmail } = require('../utils/mailer');

const resetTokens = new Map();

async function register(payload) {
  const role = await Role.findOne({ where: { name: payload.role } });
  if (!role) throw new Error('Invalid role');

  const passwordHash = await bcrypt.hash(payload.password, 12);
  const user = await User.create({ ...payload, passwordHash, roleId: role.id });
  await ActivityLog.create({ userId: user.id, action: 'auth.register' });
  return user;
}

async function login(email, password) {
  const user = await User.findOne({ where: { email }, include: [Role] });
  if (!user) throw new Error('Invalid credentials');
  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) throw new Error('Invalid credentials');

  const payload = { id: user.id, role: user.role.name };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  await RefreshToken.create({ userId: user.id, token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  await ActivityLog.create({ userId: user.id, action: 'auth.login' });
  return { accessToken, refreshToken, user };
}

async function rotateRefreshToken(oldToken) {
  const tokenRecord = await RefreshToken.findOne({ where: { token: oldToken, revoked: false, expiresAt: { [Op.gt]: new Date() } } });
  if (!tokenRecord) throw new Error('Invalid refresh token');
  tokenRecord.revoked = true;
  await tokenRecord.save();

  const user = await User.findByPk(tokenRecord.userId, { include: [Role] });
  const payload = { id: user.id, role: user.role.name };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  await RefreshToken.create({ userId: user.id, token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  return { accessToken, refreshToken };
}

async function forgotPassword(email) {
  const user = await User.findOne({ where: { email } });
  if (!user) return;
  const token = crypto.randomBytes(32).toString('hex');
  resetTokens.set(token, { userId: user.id, expiresAt: Date.now() + 15 * 60 * 1000 });
  await sendPasswordResetEmail(email, token);
}

async function resetPassword(token, newPassword) {
  const record = resetTokens.get(token);
  if (!record || record.expiresAt < Date.now()) throw new Error('Invalid or expired reset token');
  const user = await User.findByPk(record.userId);
  user.passwordHash = await bcrypt.hash(newPassword, 12);
  await user.save();
  resetTokens.delete(token);
}

module.exports = { register, login, rotateRefreshToken, forgotPassword, resetPassword };
