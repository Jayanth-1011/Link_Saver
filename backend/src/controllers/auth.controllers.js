import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';  
import { generateToken, verifyToken } from '../utils/jwt.js'; 

// Signup Controller
export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate inputs
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate JWT and set it as a cookie
  generateToken(res, user._id);

  // Return user info without password
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare password with the stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT and set it as a cookie
  generateToken(res, user._id);

  // Return user info without password
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};

// Logout Controller
export const logoutUser = (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('jwt');

  res.json({ message: 'Logged out successfully' });
};

// CheckAuth Controller (Verify user via JWT token)
export const checkAuth = (req, res) => {
  const token = req.cookies.jwt;

  // If no token is provided, send error
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify the token
  const decoded = verifyToken(token);

  // If the token is invalid or expired
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  // Find the user using the decoded token's user ID
  User.findById(decoded.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return user data without password
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch(() => res.status(500).json({ message: 'Server error' }));
};
