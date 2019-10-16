const {check, body } = require('express-validator');

const express = require('express');

const AuthController = require('../controllers/AuthController');

const authValidation = require('./validation/authValidation');

const router = express.Router();

router.post('/register', authValidation.signUp, AuthController.store);

router.post('/login', authValidation.signIn, AuthController.signIn);

module.exports = router;