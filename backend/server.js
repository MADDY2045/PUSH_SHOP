import express from 'express';
import connectDB from './config/db.js'; //.js extension is mandatory for server side es imports module
import dotenv from 'dotenv';
import colors from 'colors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();

//connect the DB
connectDB();

app.use('/api/products', productRoutes);

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
