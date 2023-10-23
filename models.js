const mongoose = require("mongoose");

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  yop: Date,
  genre: [String],
  image: String,
  author: String,
  ifAvailable: Boolean,
  inSwap: Boolean,
  returnDate: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Book = mongoose.model("Book", bookSchema);

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: String,
  password: String,
  ownedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  reviewsMade: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  reviewsAbout: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  lookingFor: [String],
  refreshToken: String,
});

const User = mongoose.model("User", userSchema);

// Reviews Schema
const reviewsSchema = new mongoose.Schema({
  reviewTitle: String,
  reviewRating: Number,
  reviewBody: String,
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviewed: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Review = mongoose.model("Review", reviewsSchema);

const swapSchema = new mongoose.Schema({
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const Swap = mongoose.model("Swap", swapSchema);

module.exports = { User, Book, Review, Swap };
