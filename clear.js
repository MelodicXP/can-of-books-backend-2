'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book');

const DATABASE = process.env.MONGODB_CONN;

// ** Function Declarations **
async function clearDatabase () {
  await connectToDatabase(); // wait for db connection prior to proceeding

  try {
    await Book.deleteMany({});
    console.log('Books cleared');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect().then(() => console.log('Disconnected from database'));
  }
}

async function connectToDatabase() {
  try {
    await mongoose.connect(DATABASE);
    console.log('Connected to database, ready to clear database');
  } catch (error) {
    console.error('Error connecting to database, cannot clear database: ', error);
  }
}

// ** Executable Code (Entry Point) **
clearDatabase();
