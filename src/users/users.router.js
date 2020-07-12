const { Router } = require('express');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const { validateData } = require('../validator');
const {
  createContact,
  listContacts,
  getContactById,
  removeContact,
  updateContact,
} = require('./user.controller');

// const contact = require('../contact_db');

const router = Router();

const userIdShema = Joi.object({
  contactId: Joi.objectId(),
});

const userShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  subscription: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string().required(),
});

const userUpdateShema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().min(5),
  phone: Joi.string().min(3),
  subscription: Joi.string().min(2),
  password: Joi.string().min(3),
  token: Joi.string(),
}).min(1);

router.get('/', listContacts);

router.get('/:contactId', validateData(userIdShema, 'params'), getContactById);

router.post('/', validateData(userShema), createContact);

router.patch(
  '/:contactId',
  validateData(userIdShema, 'params'),
  validateData(userUpdateShema),
  updateContact,
);

router.delete(
  '/:contactId',
  validateData(userIdShema, 'params'),
  removeContact,
);

exports.userRouter = router;
