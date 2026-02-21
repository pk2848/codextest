const router = require('express').Router();
const c = require('../controllers/authController');
const validate = require('../middleware/validate');
const { registerValidation, loginValidation } = require('../validations/authValidation');

router.post('/register', registerValidation, validate, c.register);
router.post('/login', loginValidation, validate, c.login);
router.post('/refresh-token', c.refreshToken);
router.post('/forgot-password', c.forgotPassword);
router.post('/reset-password', c.resetPassword);

module.exports = router;
