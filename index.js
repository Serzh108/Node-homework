const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Joi = require('@hapi/joi');
const uuid = require('uuid');
const contact = require('./contact');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
const PORT = 3000;
const userShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const userUpdateShema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().min(5),
  phone: Joi.string().min(3),
}).min(1);

app.get('/api/contacts', listContacts);

app.get('/api/contacts/:contactId', getById);

app.delete('/api/contacts/:contactId', removeContact);

app.post('/api/contacts', validateData(userShema), addContact);

app.patch(
  '/api/contacts/:contactId',
  validateData(userUpdateShema),
  updateContact,
);

function listContacts(req, res, next) {
  contact.listContacts(contact.contactsPath).then(resultsContacts => {
    return res.status(200).send(resultsContacts);
  });
}

function getById(req, res, next) {
  contact
    .getContactById(contact.contactsPath, req.params.contactId)
    .then(resultsContact => {
      if (!resultsContact) {
        return res.status(404).send({ message: 'Not found' });
      }
      return res.status(200).send(resultsContact);
    });
}

function removeContact(req, res, next) {
  contact
    .removeContact(contact.contactsPath, req.params.contactId)
    .then(resultDelete => {
      if (resultDelete) {
        return res.status(404).send({ message: `Not found` });
      }
      return res.status(200).send({ message: 'contact deleted' });
    });
}

function addContact(req, res, next) {
  const id = uuid.v4();
  const newUser = {
    ...req.body,
    id,
  };
  contact.addContact(contact.contactsPath, newUser).then(newContact => {
    return res.status(201).send(newContact);
  });
}

function updateContact(req, res, next) {
  contact
    .updateContact(contact.contactsPath, req.params.contactId, req.body)
    .then(updetedContact => {
      if (!updetedContact) {
        return res.status(404).send({ message: 'Not found' });
      }
      return res.status(200).send(updetedContact);
    });
}

function validateData(shema) {
  return (req, res, next) => {
    const validationResult = shema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send({ message: 'missing required field' });
    }
    next();
  };
}

app.use((err, req, res, next) => {
  const { message, status } = err;
  return res.status(status || 500).send(message);
});

app.listen(PORT, function () {
  console.log('Listen on port: ', PORT);
});
