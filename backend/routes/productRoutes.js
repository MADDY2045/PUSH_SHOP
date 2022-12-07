import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

//get all the products, create a new product
router.route('/').get(getProducts).post(protect, admin, createProduct);

//create a product reviw
router.route('/:id/reviews').post(protect, createProductReview);

//get the product based on id, delete.update a product by an admin
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
