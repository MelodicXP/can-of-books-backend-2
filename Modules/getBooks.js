'use strict';

const Book = require('../Model/bookModel');

function getBooks(request, expressResponse, next){
  Book.find({})
    .then(data => expressResponse.status(200).send(data))
    .catch(err => next(err));
}

module.exports = getBooks;
