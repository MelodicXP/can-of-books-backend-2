'use strict';

// const { response } = require('express');
const Book = require('../Model/bookModel');

// Create empty object as this file will export functions as objects now
const bookHandler = {};

// Function getBooks - is a method of bookHandler
bookHandler.getBooks = function(request, expressResponse, next){

  console.log(request.user.email); 

  // Set property of user email
  let queryObject = {email: request.user.email};
  // let queryObjectTest = {email: request.user.email};
  // console.log(queryObjectTest);

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

  let bookDataWithEmailAdded = {...data, email: request.user.email};
  console.log(bookDataWithEmailAdded);

  // Create new book from data and send back confirmation if data created successfully
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
  // new - returns updated doc instead of old doc
  // overwrite - overwrites doc completely avoiding unwanted properties/side-effects
  Book.findByIdAndUpdate(id, data, {new: true, overwrite: true})
    .then(updatedBook => expressResponse.status(200).send(updatedBook))
    .catch(err => {
      // Log error and send a 500 Internal Server Error response
      console.error(err);
      expressResponse.status(500).send('Internal Server Error, updating book');
    });
};

// Funciton deleteBooks - method of bookHandler
bookHandler.deleteBooks = function(request, expressResponse, next){
  const {id} = request.params;
  Book.findByIdAndDelete(id)
    .then(deletedBook => expressResponse.status(200).send(deletedBook)) // Send back confirmation of deleted data
    .catch(err => {
      // Log error and send a 500 Internal Server Error response
      console.error(err);
      expressResponse.status(500).send('Internal Server Error, deleting book');
    });
};

module.exports = bookHandler;
