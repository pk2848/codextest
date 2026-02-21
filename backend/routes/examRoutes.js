const router = require('express').Router();
const c = require('../controllers/examController');

router.post('/', c.createExam);
router.get('/:examId/report-card/:studentId', c.reportCard);

module.exports = router;
