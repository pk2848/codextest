const { body } = require('express-validator');

exports.createStudentValidation = [
  body('userId').isInt({ min: 1 }),
  body('sectionId').isInt({ min: 1 }),
  body('academicYear').isString().notEmpty()
];
