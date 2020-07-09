require('./config');
const mongoose = require('mongoose');

async function main() {
  try {
    const connection_db = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');
  } catch (err) {
    console.log('Error: ', err);
    process.exit(1);
  }
}

main();
