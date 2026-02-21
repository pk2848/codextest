module.exports = (sequelize, DataTypes) => sequelize.define('section', {
  name: { type: DataTypes.STRING(10), allowNull: false },
  classRoomId: { type: DataTypes.INTEGER, allowNull: false }
}, { indexes: [{ unique: true, fields: ['name', 'classRoomId'] }, { fields: ['classRoomId'] }] });
