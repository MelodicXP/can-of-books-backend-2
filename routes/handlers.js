'use strict';

const Book = require("../models/book");

async function getBooks(request, response) {
  const filterQuery = {};

  if (request.query.book) {
    filterQuery.book = request.query.book;
  }

  const books = await Book.find(filterQuery);

  response.json(books);
};

async function createBook(request, response) {
  response.send('Create book placeholder');
};

async function deleteBook(request, response) {
  response.send('Delete Book placeholder');
};

module.exports = { getBooks, createBook, deleteBook };