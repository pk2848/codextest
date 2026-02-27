const router = require('express').Router();
const c = require('../controllers/attendanceController');

router.post('/daily', c.markDaily);
router.post('/rfid-scan', c.rfidScan);
router.get('/monthly-report', c.monthlyReport);

module.exports = router;
