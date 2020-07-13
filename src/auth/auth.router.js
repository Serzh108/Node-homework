const { Router } = require('express');
const Joi = require('@hapi/joi');
const { validateData } = require('../validator');
const { registerUser, loginUser, getLoggedUser, logoutUser } = require('./auth.controller');
const { authorization } = require('./auth.middleware');

const router = Router();
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  // subscription: Joi.string().required(),
  // token: Joi.string().required(),
});

router.post('/register', validateData(registerSchema), registerUser);

router.post('/login', validateData(registerSchema), loginUser);

router.get('/current', authorization, getLoggedUser);

router.post('/logout', authorization, logoutUser);

exports.authRouter = router;
