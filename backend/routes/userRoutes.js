import express from 'express';
const router = express.Router();

import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

//Register a new user
router.route('/').post(registerUser);

//login user
router.post('/login', authUser);

//Authenticate user
router.route('/profile').get(protect, getUserProfile);

export default router;
