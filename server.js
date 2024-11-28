'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors()); // Middleware

// Connect to MongoDB with Mongoose using async/await
async function connectToDatabase() {
  try {
    // Connect to the MongoDB instance at the specified URL
    await mongoose.connect('mongodb://127.0.0.1:27017/books');
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the main function to connect to MongoDB
connectToDatabase();

// Define a simple route to test server
app.get('/', async (request, response) => {
  response.send('Welcome to home page!');
});

// Start the server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));


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


