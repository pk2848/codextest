const router = require('express').Router();
const c = require('../controllers/userController');

router.post('/', c.createUser);
router.get('/', c.listUsers);
router.patch('/:id', c.updateProfile);

module.exports = router;
