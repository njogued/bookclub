const { Book } = require("../models");

// methods to crud a book

// get all books
const getAllBooks = (req, res) => {
  try {
    const books = Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch books" });
  }
};

// create one book
const createOneBook = (req, res) => {
  const { title, yop, genre, owner } = req.body;
  if (req.body.image) {
    var image = req.body.image;
  } else {
    var image = "";
  }
  newBook = new Book({ title, yop, genre, image, owner });
  newBook.save((error, savedBook) => {
    if (error) {
      res.status(500).json({ error: "Failed to create a new book resource" });
    } else {
      res.status(201).json(savedBook);
    }
  });
};

// find one book
const findOneBook = (req, res, next) => {
  Book.findById(req.params.id, (error, book) => {
    if (error) {
      res.status(500).json({ error: "Server error, could not fetch the book" });
    } else {
      if (!book) {
        res.status(404).json({ error: "The book doesn't exist yet" });
        next();
      }
      res.status(200).json(book);
    }
  });
};

// update one book
const updateOneBook = (req, res) => {
  const id = req.params.id;
  updateDetails = req.body;
  Book.findOneAndUpdate(
    { id },
    updateDetails,
    { new: true },
    (error, updatedBook) => {
      if (error) {
        res
          .status(500)
          .json({ error: "Server Error. Book could not be updated" });
      } else {
        if (!updatedBook) {
          return res.status(500).json({ error: "Could not find the book" });
        }
        res.status(204).json({ message: "Book resource updated" });
      }
    }
  );
};

// delete a book
const deleteBook = (req, res) => {
  const id = req.params.id;
  Book.findByIdAndRemove(id, (error, deletedBook) => {
    if (error) {
      res.status(500).json({ error: "Could not delete the book" });
    } else {
      if (!deletedBook) {
        return res.status(404).json({ error: "Could not find the book" });
      }
      res.status(200).json(deletedBook);
    }
  });
};

module.exports = {
  getAllBooks,
  createOneBook,
  findOneBook,
  updateOneBook,
  deleteBook,
};
