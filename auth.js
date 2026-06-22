// Import Express framework for building the server
const express = require('express');
// Create an Express Router instance for modular routing
const router = express.Router();

const db=require('../config/db');
// Import bcrypt for password hashing and comparison
const bcrypt = require('bcryptjs');
// Import jsonwebtoken for creating JWTs for authentication
const jwt = require('jsonwebtoken');
// Import User model for database operations
const User = require("./user");
// Route to handle user registration (POST /register)
console.log("AUTH FILE LOADED");
router.get('/test', (req,res)=>{
    res.send("Auth route working");
});
require('dotenv').config();
router.post('/register', async (req, res) => {
console.log("Register API called");
console.log(req.body);
 try {
 // Extract email, password, and name from request body
 const { email, password, name } = req.body;
 // Check if a user with the given email already exists
 const users = await User.findByEmail(email);
 if (users.length > 0) {
 // Return 400 if user exists
 return res.status(400).json({ message: 'User already exists' });
 }
 // Create a new user (password hashing likely handled in User.create)
 await User.create(email, password, name);
 // Return 201 for successful registration
 res.status(201).json({ message: 'User registered successfully' });
 } catch (error) {
 // Log error and return 500 for server errors
 console.error('Error during registration:', error);
 res.status(500).json({ message: 'Server error', error: error.message });
 }
});
// Route to handle user login (POST /login)
router.post('/login', async (req, res) => {
 try {
 // Extract email and password from request body
 const { email, password } = req.body;
 // Check if user exists by email
 const users = await User.findByEmail(email);
 if (users.length === 0) {
 // Return 400 if user not found
 return res.status(400).json({ message: 'User not found' });
 }
 // Get the first user (assuming email is unique)
 const user = users[0];
 // Compare provided password with stored hashed password
 const isMatch = await bcrypt.compare(password, user.password);
 if (!isMatch) {
 // Return 400 if password is incorrect
 return res.status(400).json({ message: 'Invalid credentials' });
 }
 // Generate JWT with user ID, signed with secret, expires in 1 hour
 const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
 // Return JWT in response
 res.json({ token });
 } catch (error) {
 // Log error and return 500 for server errors
 console.error('Error during login:', error);
 res.status(500).json({ message: 'Server error', error: error.message });
 }
});
// Export the router to be used in the main application
module.exports = router;
