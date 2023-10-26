const { Book } = require("../models");

// methods to CRUD a book

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const perPage = 10; // Number of books to display per page
    const page = req.query.page || 1; // Get the page number from the query parameters

    const books = await Book.find({})
      .sort({ created_at: -1 }) // Sort by "created_at" field in descending order (newest first)
      .skip((page - 1) * perPage)
      .limit(perPage);

    // Render the "allbooks" view and pass the books and current page to it
    res.status(200).render("allbooks", { books, currentPage: page, perPage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch books" });
  }
};

// Create one book
const createOneBook = async (req, res) => {
  try {
    const { title, yop, genre, author, owner } = req.body;
    const image = req.file["path"];
    const newBook = new Book({
      title,
      yop,
      genre,
      author,
      image,
      owner,
    });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new book resource" });
  }
};

// Find one book
const findOneBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ error: "The book doesn't exist yet" });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, could not fetch the book" });
  }
};

// Update one book
const updateOneBook = async (req, res) => {
  try {
    const id = req.params.id;
    const updateDetails = req.body;
    const updatedBook = await Book.findOneAndUpdate(
      { _id: id },
      updateDetails,
      {
        new: true,
      }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: "Could not find the book" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error. Book could not be updated" });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await Book.findByIdAndRemove(id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Could not find the book" });
    }
    res.status(204).json(deletedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the book" });
  }
};

module.exports = {
  getAllBooks,
  createOneBook,
  findOneBook,
  updateOneBook,
  deleteBook,
};
