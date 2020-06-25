const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3000;

app.get('/', function (request, respons, next) {
  respons.send('Hi from my server');
});

app.listen(PORT, function () {
  console.log('Listen onport: ', PORT)
});
