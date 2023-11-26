'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookHandler = require('./Modules/bookHandler');
const verifyUser = require('./Modules/authorize');

const app = express();
app.use(cors());

// Required to allow req body to show content (allows server to handle incoming JSON data from client)
app.use(express.json());

// PORT from .env file
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_CONN);

const db = mongoose.connection;

// MongoDB connection status (confirm if able to connect or not)
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Mongoose is connected'));

// Test connection to server
app.get('/test', (request, response) => {

  response.send('test request received');

});

// Verify user is authenticated before sending back any data
app.use(verifyUser);

// Retrieve data, post data, and delete data from database
app.get('/books', bookHandler.getBooks);
app.post('/books', bookHandler.postBooks);
app.put('/books/:id', bookHandler.updateBooks);
app.delete('/books/:id', bookHandler.deleteBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
