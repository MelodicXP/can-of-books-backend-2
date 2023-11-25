'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

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

module.exports = bookSchema;
