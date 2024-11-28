'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// Todo - for now try to get from environment
mongoose.connect('mongodb://127.0.0.1:27017/books');

const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors()); // Middleware

app.get('/', async (request, response) => {
  response.send('Welcome to home page!');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

// // Required to allow req body to show content (allows server to handle incoming JSON data from client)
// app.use(express.json());

// // PORT from .env file
// const PORT = process.env.PORT || 3001;

// mongoose.connect(process.env.MONGODB_CONN);

// const db = mongoose.connection;

// // MongoDB connection status (confirm if able to connect or not)
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', () => console.log('Mongoose is connected'));

// // Test connection to server
// app.get('/test', (request, response) => {

//   response.send('test request received');

// });

// // Verify user is authenticated before sending back any data
// app.use(verifyUser);

// // Retrieve data, post data, and delete data from database
// app.get('/books', bookHandler.getBooks);
// app.post('/books', bookHandler.postBooks);
// app.put('/books/:id', bookHandler.updateBooks);
// app.delete('/books/:id', bookHandler.deleteBooks);


