const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {User} = require('../models');

// create a new user

const createUser = (req, res) => {
  const {name,username, email, phone, password} = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Failed to hash password' });
    }
  });
  const newUser = new User({ name, username, email, phone, password: hashedPassword});

  newUser.save((err, SavedUser) => {
    if(err){
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Failed to create user'});
    } else{
      res.status(201).json(SavedUser);
    }
  }
  ); 
}

//get all users
const allUsers = (req, res) => {
  User.find({}, (err, users) =>{
    if(err) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    } else{
      res.status(200).json(users)
    }
  })
}

//get user by username
const userByUsername = (req, res) => {
  const username = req.params.username;
  User.findOne({username}, (err, user) => {
    if(err){
      return res.status(500).json({ error: 'Failed to find user' });
    } 
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user)
  });
};

//update user by username

const updateUserByUsername = (req, res) => {
  const username = req.params.username; // Capture username from the route parameters
  const updatedData = req.body;

  User.findOneAndUpdate({ username }, updatedData, { new: true }, (err, user) => {
    if (err) {
      console.error('Error updating user by username:', err);
      return res.status(500).json({ error: 'Failed to update user' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  });
};

// Delete a user by username
const deleteUserByUsername = (req, res) => {
  const username = req.params.username; // Capture username from the route parameters

  User.findOneAndRemove({ username }, (err, user) => {
    if (err) {
      console.error('Error deleting user by username:', err);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send(); // User was successfully deleted, no content to return
  });
};



