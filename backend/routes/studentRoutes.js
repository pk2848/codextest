const router = require('express').Router();
const c = require('../controllers/studentController');
const { createStudentValidation } = require('../validations/studentValidation');
const validate = require('../middleware/validate');

router.post('/', createStudentValidation, validate, c.create);
router.get('/', c.list);
router.delete('/:id', c.remove);
router.get('/:id/attendance', c.attendance);

module.exports = router;
