const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user");

// Route for getting all users
router.get("/", usersController.allUsers);

// Route for getting a specific user by ID
router.get("/:id", usersController.userByUsername);

// Route for creating a new user
router.post("/signup", usersController.createUser);

router.post("/login", usersController.loginUser);

// Route for updating an existing user
router.put("/:id", usersController.updateUserByUsername);

// Route for deleting a user
router.delete("/:id", usersController.deleteUserByUsername);

module.exports = router;
