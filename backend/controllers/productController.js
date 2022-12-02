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

//@desc Delete a product
//@route DELETE /api/products/:id
//Access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc Create a product
//@route POST /api/products
//Access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sony Ericsson K 300i',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc UPDATE a product
//@route PUT /api/products/:id
//Access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, brand, category, countInStock, image, description } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.image = image;
    product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Something went wrong');
  }
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
