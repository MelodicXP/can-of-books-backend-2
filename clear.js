const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONN);

let Book = require('./Model/bookModel');

async function clear () {
  try {
    await Book.deleteMany({});
    console.log('Books cleared');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();
