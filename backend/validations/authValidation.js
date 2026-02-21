const { body } = require('express-validator');

exports.registerValidation = [
  body('firstName').isString().notEmpty(),
  body('lastName').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('role').isString().notEmpty()
];

exports.loginValidation = [body('email').isEmail(), body('password').isString().notEmpty()];
