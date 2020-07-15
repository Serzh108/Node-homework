const { userModel } = require('./users.model');

// ================================================
exports.createContact = async (req, res, next) => {
  try {
    const newContact = await userModel.create(req.body);
    res.status(201).send(newContact);
  } catch (err) {
    next(err);
  }
};
// ================================================
exports.listContacts = async (req, res, next) => {
  try {
    const contacts = await userModel.find();
    return res.status(200).send(contacts);
  } catch (err) {
    next(err);
  }
};
// ================================================
exports.listContactsWithPage = async (req, res, next) => {
  const url = req.url;
  const options = url
    .replace('/?', '')
    .split('&')
    .reduce((acc, item) => {
      const x = item.split('=');
      x[0] === 'sub' ? (acc[x[0]] = x[1]) : (acc[x[0]] = +x[1]);
      return acc;
    }, {});
   try {
    let contacts;
    if (options.hasOwnProperty('sub') || options.hasOwnProperty('/')) {
      contacts = await userModel.find(
        options.sub ? { subscription: options.sub } : {},
      );
    } else {
      contacts = await userModel.paginate(
        {},
        options,
        (err, result) => result.docs,
      );
    }

    return res.status(200).send(contacts);
  } catch (err) {
    next(err);
  }
};
// ================================================
exports.getContactById = async function (req, res, next) {
  try {
    const ContactById = await userModel.findById(req.params.contactId);
    if (!ContactById) {
      return res.status(404).send({ message: 'Contact not found' });
    }
    return res.status(200).send(ContactById);
  } catch (err) {
    next(err);
  }
};
// ================================================
exports.updateContact = async (req, res, next) => {
  try {
    const updatedContact = await userModel.findByIdAndUpdate(
      req.params.contactId,
      { $set: req.body },
      { new: true },
    );
c
  } catch (err) {
    next(err);
  }
};
// ================================================
exports.removeContact = async (req, res, next) => {
  try {
    const deleteContact = await userModel.findByIdAndRemove(
      req.params.contactId,
    );
    if (!deleteContact) {
      return res.status(404).send({ message: 'Contact not found' });
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
