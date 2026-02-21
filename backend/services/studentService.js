const { StudentProfile, Enrollment, User, Section, ClassRoom } = require('../models');

const createAdmissionNo = () => `ADM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

async function createStudent(userId, data) {
  const admissionNo = createAdmissionNo();
  const profile = await StudentProfile.create({ userId, admissionNo, dateOfBirth: data.dateOfBirth, academicHistory: data.academicHistory || {} });
  await Enrollment.create({ studentId: profile.id, sectionId: data.sectionId, academicYear: data.academicYear });
  return profile;
}

async function listStudents(page = 1, limit = 20, query = '') {
  const offset = (page - 1) * limit;
  return StudentProfile.findAndCountAll({
    include: [{ model: User, where: query ? { firstName: query } : undefined }, { model: Section, include: [ClassRoom] }],
    limit,
    offset
  });
}

module.exports = { createStudent, listStudents };
