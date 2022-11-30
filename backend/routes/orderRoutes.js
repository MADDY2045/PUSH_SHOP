import express from 'express';
const router = express.Router();

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

//Register a new user
router.route('/').post(protect, addOrderItems);
//Get the order by id
router.route('/:id').get(protect, getOrderById);
//Update the payment to paid
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
