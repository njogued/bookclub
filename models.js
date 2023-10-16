const mongoose = require('mongoose');

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  yop: Date,
  genre: [String],
  image: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Book = mongoose.model('Book', bookSchema);

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  password: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  lookingFor: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = { User, Book };



