'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create book schema
const bookSchema = new Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['Want to Read', 'In Progress', 'Completed'], // Define the allowed string values
  },
  imageUrl: String,
  email: String,
});

// Create book model based on schema
const Book = mongoose.model('Book', bookSchema);

// Export book model
module.exports = Book;
