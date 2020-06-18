const fs = require('fs');
const { promises: fsPromises } = fs;
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');
// console.log('contactsPath = ', contactsPath);
// ================================================
// const dataFromJson = fs.readFileSync(`${contactsPath}`, "utf-8");
// console.log('dataFromJson : ', dataFromJson);
// ================================================
async function listContacts() {
  try {
    await fsPromises
      .readFile(`${contactsPath}`, 'utf-8')
      .then(res => console.log('res = ', res));
  } catch (err) {
    throw err;
  }
}

// listContacts();
// ================================================
async function getContactById(contactId) {
  try {
    await fsPromises.readFile(`${contactsPath}`, 'utf-8').then(res => {
      const result = JSON.parse(res);
      const contact = result.find(item => item.id === contactId);
      console.log('contact = ', contact);
    });
  } catch (err) {
    throw err;
  }
}

// getContactById(7);
// ================================================
async function removeContact(contactId) {
  try {
    await fsPromises.readFile(`${contactsPath}`, 'utf-8').then(res => {
      const result = JSON.parse(res);
      const newContact = result.filter(item => item.id !== contactId);
      // console.log('newContact = ', newContact);
      fsPromises.writeFile(`${contactsPath}`, JSON.stringify(newContact));
    });
  } catch (err) {
    throw err;
  }
}

// removeContact(3);
// ================================================
async function addContact(name, email, phone) {
  try {
    await fsPromises.readFile(`${contactsPath}`, 'utf-8').then(res => {
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
      fsPromises.writeFile(`${contactsPath}`, JSON.stringify(result));
    });
  } catch (err) {
    throw err;
  }
}

// addContact('Vasya Pupkin', 'Vasya.Pupkin@vestibul.com', '(044) 098-7654');
// ================================================
