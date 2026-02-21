const router = require('express').Router();
const c = require('../controllers/feeController');

router.post('/structures', c.createStructure);
router.post('/invoices', c.generateInvoice);
router.post('/payments', c.recordPayment);

module.exports = router;
