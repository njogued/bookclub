require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.connect(process.env.DB_URL);

// Import routes
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");

// Link routes to app
app.use("/books", bookRoutes);
app.use("/users", userRoutes);

app.listen(3000);
