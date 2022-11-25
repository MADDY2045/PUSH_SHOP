import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

//get all the products
router.route('/').get(getProducts);

//get the product based on id
router.route('/:id').get(getProductById);

export default router;
