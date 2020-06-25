const fs = require('fs');
const { promises: fsPromises } = fs;
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');
module.exports.contactsPath = contactsPath;
// console.log('contactsPath = ', contactsPath);
// ================================================
// const dataFromJson = fs.readFileSync(`${contactsPath}`, "utf-8");
// console.log('dataFromJson : ', dataFromJson);
// ================================================
module.exports.listContacts = async function (pathToFile) {
  try {
    await fsPromises
      .readFile(pathToFile, 'utf-8')
      .then(res => console.table(JSON.parse(res)));
    // .then(res => console.log('Contacts list: ',  JSON.parse(res)));
  } catch (err) {
    throw err;
  }
};

// listContacts(contactsPath);
// ================================================
module.exports.getContactById = async function (pathToFile, contactId) {
  try {
    await fsPromises.readFile(pathToFile, 'utf-8').then(res => {
      const result = JSON.parse(res);
      const contact = result.find(item => item.id === contactId);
      console.table(contact);
      // console.log('contact = ', contact);
    });
  } catch (err) {
    throw err;
  }
};

// getContactById(7);
// ================================================
module.exports.removeContact = async function (pathToFile, contactId) {
  try {
    await fsPromises.readFile(pathToFile, 'utf-8').then(res => {
      const result = JSON.parse(res);
      const newContact = result.filter(item => item.id !== contactId);
      // console.log('newContact = ', newContact);
      fsPromises.writeFile(pathToFile, JSON.stringify(newContact));
    });
  } catch (err) {
    throw err;
  }
};

// removeContact(3);
// ================================================
module.exports.addContact = async function (pathToFile, name, email, phone) {
  try {
    await fsPromises.readFile(pathToFile, 'utf-8').then(res => {
      const result = JSON.parse(res);
      const lastContactId = result[result.length - 1].id;
      // console.log('lastContactId = ', lastContactId);
      const newContact = {
        id: lastContactId + 1,
        name,
        email,
        phone,
      };
      result.push(newContact);
      // console.log('result = ', result);
      fsPromises.writeFile(pathToFile, JSON.stringify(result));
    });
  } catch (err) {
    throw err;
  }
};

// addContact('Vasya Pupkin', 'Vasya.Pupkin@vestibul.com', '(044) 098-7654');
// ================================================
