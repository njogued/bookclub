const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user");

// Route for getting all users
router.get("/", usersController.allUsers);

// Route for getting a specific user by ID
router.get(
  "/:username",
  usersController.authorizedMiddleware,
  usersController.userByUsername
);

// Route for creating a new user
router.post("/signup", usersController.createUser);

// route for logging in
// sends username and password
router.post("/login", usersController.loginUser);

// route for logging out a user
router.post("/logout", usersController.logoutUser);

// Route for updating an existing user
router.put("/:username", usersController.updateUserByUsername);

// Route for deleting a user
router.delete("/:username", usersController.deleteUserByUsername);

module.exports = router;
