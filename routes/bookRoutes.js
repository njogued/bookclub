const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");
const { authorizedMiddleware } = require("../controllers/user");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/images/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop(); // Get the file extension
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});

const upload = multer({ storage: storage });

// GET all books
router.get("/", authorizedMiddleware, bookController.getAllBooks);

// GET book creating page
router.get("/create", authorizedMiddleware, (req, res) => {
  console.log(req.user.id);
  res.render("createbook");
});

// GET a specific book by ID
router.get("/:id", bookController.findOneBook);

// POST a new book
router.post(
  "/create",
  upload.single("image"),
  authorizedMiddleware,
  bookController.createOneBook
);

//POST swap a book
router.post("/", authorizedMiddleware, bookController.swapBook);
// PUT/update a book by ID
router.put("/:id", bookController.updateOneBook);

// DELETE a book by ID
router.delete("/:id", bookController.deleteBook);

module.exports = router;
