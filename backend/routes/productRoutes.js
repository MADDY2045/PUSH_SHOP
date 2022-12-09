const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} = require('../controllers/productController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

//get all the products, create a new product
router.route('/').get(getProducts).post(protect, admin, createProduct);

//create a product reviw
router.route('/:id/reviews').post(protect, createProductReview);

//Router to get top produts
router.route('/top').get(getTopProducts);

//get the product based on id, delete.update a product by an admin
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

module.exports = router;
