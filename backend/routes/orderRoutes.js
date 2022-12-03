import express from 'express';
const router = express.Router();

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

//Add order items,get all orders by admin
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
//Get all the orders based on logged in users
//positioning of the route is important here
router.route('/myorders').get(protect, getMyOrders);
//Get the order by id
router.route('/:id').get(protect, getOrderById);
//Update the payment to paid
router.route('/:id/pay').put(protect, updateOrderToPaid);
//Update the payment to delivered by admin
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
