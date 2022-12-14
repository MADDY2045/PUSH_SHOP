import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <NavLink className="nav-link" to={`/product/${product._id}`}>
        <div>
          <Card.Img src={product.image} variant="top" />
        </div>
      </NavLink>

      <Card.Body>
        <NavLink to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </NavLink>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">&#8377; {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
