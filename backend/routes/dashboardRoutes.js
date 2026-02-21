const router = require('express').Router();
const c = require('../controllers/dashboardController');

router.get('/stats', c.stats);

module.exports = router;
