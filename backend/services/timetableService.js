const { Op } = require('sequelize');
const { TimetableEntry } = require('../models');

async function hasConflict(payload) {
  const conflict = await TimetableEntry.findOne({
    where: {
      dayOfWeek: payload.dayOfWeek,
      [Op.or]: [{ sectionId: payload.sectionId }, { teacherId: payload.teacherId }],
      [Op.and]: [
        { startTime: { [Op.lt]: payload.endTime } },
        { endTime: { [Op.gt]: payload.startTime } }
      ]
    }
  });
  return Boolean(conflict);
}

module.exports = { hasConflict };
