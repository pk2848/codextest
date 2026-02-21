const router = require('express').Router();
const c = require('../controllers/teacherController');

router.get('/', c.list);
router.get('/:teacherId/timetable', c.getTimetable);
router.post('/marks', c.enterMarks);

module.exports = router;
