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

module.exports = { getBooks };