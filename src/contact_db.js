require('./config');
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
}

main();
