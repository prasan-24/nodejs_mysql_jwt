const express = require('express');
const router = express.Router();

const { userSignUp, userLogin } = require('../controller/userController');

const userMiddleware = require('../middleware/user');

//Sign up end point

router.post('/signup', userMiddleware.validateFields, userSignUp);

//Sign in end point

router.post('/login', userLogin);

module.exports = router;