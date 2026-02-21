const router = require('express').Router();
const c = require('../controllers/attendanceController');

router.post('/daily', c.markDaily);
router.get('/monthly-report', c.monthlyReport);

module.exports = router;
