const { Router } = require('express');
const Joi = require('@hapi/joi');
const { validateData } = require('../validator');
const { registerUser, loginUser, getLoggedUser, logoutUser } = require('./auth.controller');
const { authorization } = require('./auth.middleware');

const router = Router();
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post('/auth/register', validateData(registerSchema), registerUser);

router.post('/auth/login', validateData(registerSchema), loginUser);

router.get('/users/current', authorization, getLoggedUser);

router.post('/auth/logout', authorization, logoutUser);

exports.authRouter = router;
