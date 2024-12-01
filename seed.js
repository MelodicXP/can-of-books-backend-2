'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book');

const DATABASE = process.env.MONGODB_CONN;

// ** Function Declarations **
async function seedDatabase() {
  await connectToDatabase(); // wait for db connection prior to proceeding

  try {
    await Book.create({
      title: 'Ready Player One',
      description: 'In "Ready Player One" by Ernest Cline, it is a science fiction novel set in a dystopian 2045, where climate change has led to global crises. Wade Watts, a poor teenager, embarks on a quest within a virtual reality game called the OASIS to find an Easter egg that would grant him the game creator\'s fortune. The story explores the journey to discover the egg, the consequences of the hunt in the real world, and the transformation of the OASIS from paradise to a prison-like environment.',
      status: 'Completed',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCjmUXENJmPOL0DNPCG2xFN-gczgK6u-hVkA&usqp=CAU'
    });
    console.log('Saved "Ready Player One" to DB');

    await Book.create({
      title: 'Ready Player Two',
      description: 'In "Ready Player Two" by Ernest Cline, the story continues with Wade Watts, who discovers a new technology called the ONI that connects to the OASIS. A new quest within the OASIS involves finding the Seven Shards of the Siren’s Soul. Wade, Aech, and Shoto embark on this quest while facing challenges and uncovering their creator\'s secrets.',
      status: 'In Progress',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNrBQK9-SqZZqC1ZTieolryV6sSvQM59K3GNjIk7nYA9v-fkHdjKO-nA8y4nkRuCJk6Jc&usqp=CAU'
  
    });
    console.log('Saved "Ready Player Two" to DB');

    await Book.create({
      title: 'Hail Mary',
      description: '"Project Hail Mary" by Andy Weir is a science fiction novel where Dr. Ryland Grace, a high school science teacher, awakens from a coma on a spaceship in another solar system. His mission is to save humanity from a sun-devouring alien. Throughout the story, themes of survival, sacrifice, and utilitarian good are explored, with an optimistic perspective on the strength of the will to survive. This book is recommended for ages 14+ and is free of explicit language.',
      status: 'Want to Read',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT2sm65GrG6fvJsh4z0cZE8lf4CHrGeBSi2WJsVGZFleruT4wnlWCYsVBUSswy2yqb5o8&usqp=CAU'
    });
    console.log('Saved "Project Hail Mary" to DB');

  } catch (error) {
    console.error('Error saving books to DB');
  } finally {
    // Always close connection, whether or not there is error
    mongoose.disconnect().then(() => console.log('Disconnected from database'));
  }
}

async function connectToDatabase() {
  try {
    await mongoose.connect(DATABASE);
    console.log('Connected to database, ready to seed');
  } catch (error) {
    console.error('Error connecting to database, cannot seed: ', error);
  }
}

// ** Executable Code (Entry Point) **
seedDatabase();