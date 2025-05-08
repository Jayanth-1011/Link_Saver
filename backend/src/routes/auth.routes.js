import express from 'express';
import { loginUser, signupUser, logoutUser, checkAuth } from '../controllers/auth.controllers.js';
import protect from "../middleware/protect.js"

const router = express.Router();

// POST: /api/auth/signup - Register a new user
router.post('/signup', signupUser);

// POST: /api/auth/login - Login an existing user
router.post('/login', loginUser);

// POST: /api/auth/logout - Logout the current user
router.post('/logout', logoutUser);

// GET: /api/auth/me - Get user profile (protected)
router.get('/checkAuth', protect, checkAuth);

export default router;
