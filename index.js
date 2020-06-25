const argv = require('yargs').argv;
const contact = require('./contact');

// console.log('contactsPath = ', contact.contactsPath);

// contact.listContacts(contact.contactsPath);

// contact.getContactById(contact.contactsPath, 11);

// contact.removeContact(contact.contactsPath, 11);

// contact.addContact(contact.contactsPath, 'Vasya Pupkin', 'Vasya.Pupkin@goit.com.ua', '(044) 098-7654')
// ============================================

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contact.listContacts(contact.contactsPath);
      break;

    case 'get':
      contact.getContactById(contact.contactsPath, id);
      break;

    case 'add':
      contact.addContact(contact.contactsPath, name, email, phone);
      break;

    case 'remove':
      contact.removeContact(contact.contactsPath, id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
