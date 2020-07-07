require('./src/config');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
// const contact = require('./src/contact_db');
// =-=-=-=-=
const { userRouter } = require('./src/users/users.router');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

const PORT = process.env.PORT;

app.use("/api/contacts", userRouter);

app.use((err, req, res, next) => {
  const { message, status } = err;
  return res.status(status || 500).send(message);
});

app.listen(PORT, function () {
  console.log('Listen on port: ', PORT);
});
