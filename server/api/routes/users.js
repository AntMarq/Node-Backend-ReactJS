const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const UsersController = require ('../controllers/users');

router.post('/signup', UsersController.users_signup);

router.post('/login', UsersController.users_login);

router.delete('/:userId', checkAuth, UsersController.users_delete);

router.get('/',  UsersController.users_get_all);


module.exports = router;
