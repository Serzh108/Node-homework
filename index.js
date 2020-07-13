require('./src/config');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const { userRouter } = require('./src/users/users.router');
const { authRouter } = require('./src/auth/auth.router');
const { main } = require('./src/contact_db');

const PORT = process.env.PORT;

const app = express();

main();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// app.use('/api/contacts', userRouter);
app.use('/', authRouter);

app.use((err, req, res, next) => {
  const { message, status } = err;
  return res.status(status || 500).send(message);
});

app.listen(PORT, function () {
  console.log('Listen on port: ', PORT);
});
