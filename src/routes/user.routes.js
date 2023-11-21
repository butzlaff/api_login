const express = require('express');
const { UserController } = require('../controllers/index');
const validateJwt = require('../middlewares/JWT');

const router = express.Router();

router.post('/register', UserController.createUser);
router.post('/login', UserController.login);
router.get('/:id', validateJwt, UserController.findUserById);

module.exports = router;