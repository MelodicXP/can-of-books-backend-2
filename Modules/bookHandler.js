'use strict';

// const { response } = require('express');
const Book = require('../Model/bookModel');

// Create empty object as this file will export functions as objects now
const bookHandler = {};

// Function getBooks - is a method of bookHandler
bookHandler.getBooks = function(request, expressResponse, next){

  // Set property of user email
  let queryObject = {email: request.user.email};

  Book.find(queryObject) // Find data by user email
    .then(data => {
      if (data) {
        expressResponse.status(200).send(data);
      } else {
        // If no books found, respond with 404
        expressResponse.status(404).send('No books found');
      }
    })
    .catch(err => {
      // Log the error and send a 500 Internal Server Error response
      console.error(err);
      expressResponse.status(500).send('Internal Server Error, getting books');
    });
};

// Function postBooks - method of bookHandler
bookHandler.postBooks = function(request, expressResponse, next){

  const data = request.body; // Data sent from front-end to back-end gets received as req.body on the back-end

  if (!data || !data.title || !data.description) {
    // Validate request body for required book data
    return expressResponse.status(400).send('Invalid book data');
  }

  // Add user email property to book data
  let bookDataWithEmailAdded = {...data, email: request.user.email};

  // Create new book from data along with user email and send back confirmation if data created successfully
  Book.create(bookDataWithEmailAdded)
    .then(createdBook => expressResponse.status(201).send(createdBook))
    .catch(err => {
      // Log error and send a 500 Internal Server Error response
      console.error(err);
      expressResponse.status(500).send('Internal Server Error, creating book');
    });
};

// Function updateBooks - method of bookHandler
bookHandler.updateBooks = function(request, expressResponse, next){
  const {id} = request.params;
  const data = request.body;
  const userEmail = request.user.email;

  // new - returns updated doc instead of old doc
  // overwrite - overwrites doc completely avoiding unwanted properties/side-effects
  Book.findById(id)
    .then(book => {
      if (!book) {
        return expressResponse.status(404).send('Book not found');
      }

      if (book.email !== userEmail) {
        return expressResponse.status(403).send('Unauthorized to update this book');
      }

      // Proceed with update if the user email matches
      return Book.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    })
    .then(updatedBook => {
      expressResponse.status(200).send(updatedBook);
    })
    .catch(err => {
      console.error(err);
      expressResponse.status(500).send('Internal Server Error, updating book');
    });
};

// Funciton deleteBooks - method of bookHandler
bookHandler.deleteBooks = function(request, expressResponse, next){
  const {id} = request.params;
  const userEmail = request.user.email;

  // First, find book and check if it belongs to the user by comparing email
  Book.findById(id)
    .then(book => {
      if (!book) {
        return expressResponse.status(404).send('Book not found');
      }

      if (book.email !== userEmail) {
        return expressResponse.status(403).send('Unauthorized to delete this book');
      }

      // Proceed with deletion if the user email matches
      return Book.findByIdAndDelete(id);
    })
    .then(deletedBook => {
      expressResponse.status(200).send(deletedBook);
    })
    .catch(err => {
      console.error(err);
      expressResponse.status(500).send('Internal Server Error, deleting book');
    });
};

module.exports = bookHandler;
