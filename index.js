const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');

const app = express();
app.use(cors());
const PORT = 3000;

app.get('/api/contacts', listContacts
// function (request, respons, next) {
//   respons.send('Hi from my server and /api/contacts');
// }
);

function listContacts(req, res, next) {
  return res.status(200).json('<h1>res=true</h1>');
}

app.listen(PORT, function () {
  console.log('Listen onport: ', PORT);
});
