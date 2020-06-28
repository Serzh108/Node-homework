const fs = require('fs');
const { promises: fsPromises } = fs;
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');
module.exports.contactsPath = contactsPath;
// ================================================
module.exports.listContacts = async function (pathToFile) {
  try {
    const result = await fsPromises.readFile(pathToFile, 'utf-8');
    return result;
  } catch (err) {
    throw err;
  }
};
// ================================================
module.exports.getContactById = async function (pathToFile, contactId) {
  try {
    const ContactById = await fsPromises
      .readFile(pathToFile, 'utf-8')
      .then(res => {
        const result = JSON.parse(res);
        const contact = result.find(item => item.id === contactId);
        return contact;
      });
    return ContactById;
  } catch (err) {
    throw err;
  }
};
// ================================================
module.exports.removeContact = async function (pathToFile, contactId) {
  try {
    const deleteContact = await fsPromises
      .readFile(pathToFile, 'utf-8')
      .then(res => {
        const result = JSON.parse(res);
        const newContact = result.filter(item => item.id !== contactId);
        fsPromises.writeFile(pathToFile, JSON.stringify(newContact));
        return result.length === newContact.length;
      });
    return deleteContact;
  } catch (err) {
    throw err;
  }
};
// ================================================
module.exports.addContact = async function (pathToFile, newUser) {
  try {
    const newContact = await fsPromises
      .readFile(pathToFile, 'utf-8')
      .then(res => {
        const result = JSON.parse(res);
        result.push(newUser);
        fsPromises.writeFile(pathToFile, JSON.stringify(result));
        return newUser;
      });
    return newContact;
  } catch (err) {
    throw err;
  }
};
// { "name":  "Bob Pupkin", "email": "Vasya.Pupkin@vestibul.com", "phone": "(044) 098-7654" }
// ================================================
module.exports.updateContact = async function (
  pathToFile,
  contactId,
  updetedData,
) {
  try {
    const updetedContact = await fsPromises
      .readFile(pathToFile, 'utf-8')
      .then(res => {
        const result = JSON.parse(res);
        const updetedContacts = result.map(item =>
          item.id === contactId ? { ...item, ...updetedData } : item,
        );
        fsPromises.writeFile(pathToFile, JSON.stringify(updetedContacts));
        const contact = updetedContacts.find(item => item.id === contactId);
        return contact;
      });
    return updetedContact;
  } catch (err) {
    throw err;
  }
};
// ================================================
