const express = require('express');
const router = express.Router();

const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/userController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

//Register a new user and get the user
router.route('/').post(registerUser).get(protect, admin, getUsers);

//login user
router.post('/login', authUser);

//Authenticate get user and update profile
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//Delete / get / update an user by id
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

module.exports = router;
