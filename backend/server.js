const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { connectDB } = require('./config/db.js'); //.js extension is mandatory for server side es consts module
const dotenv = require('dotenv');
const colors = require('colors');

//middleware exception handlers
const { errorHandler, notFound } = require('./middleware/errorMiddleware.js');
//routes = require(controllers
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');

dotenv.config();
const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//connect the DB
connectDB();

//body parser
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

//for paypal
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//for Razorpay
app.get('/api/config/razorpay', (req, res) =>
  res.json({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running on ${process.env.NODE_ENV} mode with port # ${PORT}`.yellow
      .bold
  )
);
