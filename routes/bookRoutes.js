const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");

// GET all books
router.get("/", bookController.getAllBooks);

// GET a specific book by ID
router.get("/:id", bookController.findOneBook);

// POST a new book
router.post("/", bookController.createOneBook);

// PUT/update a book by ID
router.put("/:id", bookController.updateOneBook);

// DELETE a book by ID
router.delete("/:id", bookController.deleteBook);

module.exports = router;
