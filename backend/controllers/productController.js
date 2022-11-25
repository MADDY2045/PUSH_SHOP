import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc Get list of all products
//@route GET /api/products
//Access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

//@desc Get list of a product
//@route GET /api/products/:id
//Access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProductById, getProducts };
