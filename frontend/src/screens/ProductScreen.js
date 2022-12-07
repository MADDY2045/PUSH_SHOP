import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  Button,
  ListGroup,
  Card,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Meta from '../components/Meta';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const { error, loading, product } = useSelector(
    (state) => state.productDetails
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const { error: errorReviewCreate, success: successReviewCreate } =
    useSelector((state) => state.productReviewCreate);

  useEffect(() => {
    if (successReviewCreate) {
      alert('Review submitted!!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match.params.id, successReviewCreate]);

  if (loading) return <Loader />;

  if (error) return <Message variant="danger">{error}</Message>;

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        GO BACK
      </Link>
      <Row>
        <Meta title={product.name} />
        <Col md={6}>
          {/* fluid makes the image fit inside the container */}
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: &#8377; {product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>&#8377; {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  disabled={!product.countInStock > 0}
                  className="btn-block"
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>REVIEWS</h2>
          {product.reviews.length === 0 && <Message>NO REVIEWS YET</Message>}
          <ListGroup className="review-rating" variant="flush">
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              {errorReviewCreate && <Message>{errorReviewCreate}</Message>}
              {userInfo && (
                <>
                  <h2>WRITE A REVIEW</h2>
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating" className="mt-3">
                      <Form.Label>RATING</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                      >
                        <option value="">SELECT</option>
                        <option value="1">1 - POOR</option>
                        <option value="2">2 - FAIR</option>
                        <option value="3">3 - AVERAGE</option>
                        <option value="4">4 - GOOD</option>
                        <option value="5">5 - EXCELLENT</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment" className="mt-3">
                      <Form.Label>COMMENT</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                      ></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                      SUBMIT
                    </Button>
                  </Form>
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}></Col>
      </Row>
    </>
  );
};

export default ProductScreen;
