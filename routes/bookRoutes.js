const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");
const { authorizedMiddleware } = require("../controllers/user");

// GET all books
router.get("/", bookController.getAllBooks);

// GET book creating page
router.get("/create", authorizedMiddleware, (req, res) => {
  console.log(req.user.id);
  res.render("createbook");
});

// GET a specific book by ID
router.get("/:id", bookController.findOneBook);

// POST a new book
router.post("/create", bookController.createOneBook);

// PUT/update a book by ID
router.put("/:id", bookController.updateOneBook);

// DELETE a book by ID
router.delete("/:id", bookController.deleteBook);

module.exports = router;
