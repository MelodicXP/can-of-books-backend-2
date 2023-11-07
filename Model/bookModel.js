'use strict';

const mongoose = require('mongoose');
const bookSchema = require('./bookSchema'); // Import the schema

const bookModel = mongoose.model('Book', bookSchema);

module.exports = bookModel;
