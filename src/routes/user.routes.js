const express = require('express');
const { UserController } = require('../controllers/index');

const router = express.Router();

router.post('/register', UserController.createUser);
router.post('/login', UserController.login);
router.get('/:id', UserController.login);

module.exports = router;