const { Router } = require('express');
const Joi = require('@hapi/joi');
const { validateData } = require('../validator');
const {
  registerUser,
  loginUser,
  getLoggedUser,
  logoutUser,
  changeUsersSubscriptoin,
  changeUsersAvatar,
  verificationEmail,
} = require('./auth.controller');
const { authorization } = require('./auth.middleware');
const { sendTokenToEmail } = require('./helper/sendTokenToEmail1');

const router = Router();
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const { upload } = require('./helper/uploadAvatar');

router.post(
  '/auth/register',
  upload.single('avatar'),
  validateData(registerSchema),
  registerUser,
  sendTokenToEmail,
);

router.post('/auth/login', validateData(registerSchema), loginUser);

router.get('/users/current', authorization, getLoggedUser);

router.patch('/users', authorization, changeUsersSubscriptoin);

router.patch(
  '/users/avatars',
  authorization,
  upload.single('avatar'),
  changeUsersAvatar,
);

router.post('/auth/logout', authorization, logoutUser);

router.get('/auth/verify/:verificationToken', verificationEmail);

exports.authRouter = router;
