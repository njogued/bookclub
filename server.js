require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.connect(process.env.DB_URL);

app.use(express.json());

// Import routes
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");

// Link routes to app
app.use("/books", bookRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("Server started on Port 3k");
});
