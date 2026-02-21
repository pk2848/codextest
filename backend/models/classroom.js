module.exports = (sequelize, DataTypes) => sequelize.define('classRoom', {
  name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  classTeacherId: { type: DataTypes.INTEGER }
});
