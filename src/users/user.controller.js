const { userModel } = require('./users.model');

// ================================================
exports.createContact = async (req, res, next) => {
  try {
    const newContact = await userModel.create(req.body);
    res.status(201).send(newContact);
  } catch (err) {
    throw err;
  }
};
// ================================================
exports.listContacts = async (req, res, next) => {
  const contacts = await userModel.find();
  return res.status(200).send(contacts);
};
// ================================================
exports.getContactById = async function (req, res, next) {
  try {
    const ContactById = await userModel.find({ _id: req.params.contactId });
    if (!ContactById) {
      return res.status(404).send({ message: 'Not found' });
    }
    return res.status(200).send(ContactById);
  } catch (err) {
    throw err;
  }
};
// ================================================
exports.updateContact = async (req, res, next) => {
  try {
    const updatedContact = await userModel.updateOne(
      { _id: req.params.contactId },
      { $set: req.body },
    );
    if (!updatedContact) {
      return res.status(404).send({ message: 'Not found' });
    }
    return res.status(200).send(updatedContact);
  } catch (err) {
    throw err;
  }
};
// ================================================
exports.removeContact = async (req, res, next) => {
  try {
    const deleteContact = await userModel.deleteOne({
      _id: req.params.contactId,
    });
    if (!deleteContact) {
      return res.status(404).send({ message: 'Not found' });
    }
    return res.status(200).send({ message: 'contact deleted' });
  } catch (err) {
    throw err;
  }
};
