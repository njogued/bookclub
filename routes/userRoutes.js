const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user");
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

// Route for getting all users
router.get("/", usersController.allUsers);
// route for logging in
router.get("/login", (req, res)=>{
  res.render("login")
});

// route for get signup
router.get("/signup", (req, res)=>{
  res.render("signup")
});
// Route for getting a specific user by ID
router.get(
  "/:username",
  usersController.authorizedMiddleware,
  usersController.userByUsername
);

// Route for creating a new user
router.post("/signup", upload.single("image"), usersController.createUser);


// sends username and password
router.post("/login", usersController.loginUser);

// route for logging out a user
router.post("/logout", usersController.logoutUser);

// Route for updating an existing user
router.put("/:username", usersController.updateUserByUsername);

// Route for deleting a user
router.delete("/:username", usersController.deleteUserByUsername);

module.exports = router;
