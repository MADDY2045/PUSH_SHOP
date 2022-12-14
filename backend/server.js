import path from 'path';
import express, { json } from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js'; //.js extension is mandatory for server side es imports module
import dotenv from 'dotenv';
import colors from 'colors';

//middleware exception handlers
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
//routes from controllers
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

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

const __dirname = path.resolve();
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
