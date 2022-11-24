import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';

//@desc Get list of all products
//@route /api/products
//Access Public
router.get('/', asyncHandler(getProducts));

//@desc Get list of a product
//@route /api/products/:id
//Access Public
router.get('/:id', asyncHandler(getSingleProduct));

//Get single product route
async function getSingleProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
}

//Get all the products route
async function getProducts(req, res) {
  const products = await Product.find({});
  res.status(200).json(products);
}

export default router;
