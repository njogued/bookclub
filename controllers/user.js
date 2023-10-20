require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

// create a new user

const refreshTokens = [];

const createUser = async (req, res) => {
  try {
    const { name, username, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// login a user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the user asynchronously
    const user = await User.findOne({ username });
    console.log(req.body);
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    // Compare passwords using bcrypt.compare as a Promise
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({ error: "Cannot validate" });
    }
    if (!result) {
      return res.status(401).json({ error: "Cannot validate" });
    }
    // Passwords match, generate JWT token and send it to the client
    // JWT_SECRET generated using 'require('crypto').randomBytes(64).toString('hex')'
    const accessToken = jwt.sign(
      { username: user.username, id: user.id },
      process.env.ACCESS_SECRET,
      { expiresIn: "5m" }
    );
    const refreshToken = generateRefreshToken({ username: user.username });
    res.cookie("refresh_token", refreshToken, { httpOnly: true });
    // Save refreshToken to the user in the database
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("access_token", accessToken, { httpOnly: true, maxAge: 300000 });
    return res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// logout the user
const logoutUser = (req, res) => {
  res.clearCookie("access_cookie");
  res.clearCookie("refresh_token");
  res.json({ message: "Logged out" });
};

//get all users
const allUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(404).json({ error: "No users found" });
    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

//get user by username
const userByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to find user" });
  }
};

//update user by username

const updateUserByUsername = async (req, res) => {
  try {
    const username = req.params.username; // Capture username from the route parameters
    const updatedData = req.body;
    const updatedUser = await User.findOneAndUpdate({ username }, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(204).json(updatedUser);
  } catch (error) {
    console.error("Failed to update user:", error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete a user by username
const deleteUserByUsername = async (req, res) => {
  try {
    const username = req.params.username; // Capture username from the route parameters
    const removedUser = await User.findByIdAndRemove({ username });
    if (!removedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).send(); // User was successfully deleted, no content to return
  } catch (error) {
    console.error("Error deleting user by username:", error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET);
  refreshTokens.push(refreshToken);
  return refreshToken;
};

const authorizedMiddleware = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  console.log(accessToken);
  if (!accessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  jwt.verify(accessToken, process.env.ACCESS_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = user;
    console.log(req.user.id);
    next();
  });
};

module.exports = {
  createUser,
  allUsers,
  userByUsername,
  updateUserByUsername,
  deleteUserByUsername,
  loginUser,
  logoutUser,
  authorizedMiddleware,
};
