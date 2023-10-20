require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

mongoose.connect(process.env.DB_URL);

// Specify the view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("home");
});

// Import routes
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");

// Link routes to app
app.use("/books", bookRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("Server started on Port 3k");
});
