import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { PayPalButton } from 'react-paypal-button-v2';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import Loader from '../components/Loader';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { loading: loadingPay } = useSelector((state) => state.orderPay);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading: loadingDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const addRazorpayScript = async () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://checkout.razorpay.com/v1/checkout.js`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order) {
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.Razorpay) {
        addRazorpayScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [orderId, order, dispatch, history, userInfo]);

  function addDecimals(num) {
    return num.toFixed(2);
  }

  if (!loading) {
    //calculate prices
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    );
  }

  if (loading) return <Loader />;

  if (error) return <Message>{error}</Message>;

  const handlePayment = async () => {
    const { data } = await axios.get('/api/config/razorpay');
    var options = {
      key: data.key_id,
      key_secret: data.key_secret,
      amount: Math.round(Number(order.totalPrice)) * 100,
      currency: 'INR',
      name: order.user.name,
      description: `ORDER DETAILS OF ${orderId}`,
      handler: async function (response) {
        const paymentResult = {
          id: orderId,
          status: 'COMPLETED',
          update_time: new Date(),
          email_address: order.user.email,
        };
        await dispatch(payOrder(orderId, paymentResult));
        await dispatch(getOrderDetails(orderId));
        dispatch({ type: ORDER_PAY_RESET });
      },
      prefill: {
        name: order.user.name,
        email: order.user.email,
        contact: 9894948839,
      },
      theme: {
        color: '#3399cc',
      },
    };
    if (window.Razorpay) {
      const pay = new window.Razorpay(options);
      pay.open();
    }
  };

  const deliverHandler = async () => {
    await dispatch(deliverOrder(order));
    await dispatch(getOrderDetails(orderId));
    dispatch({ type: ORDER_DELIVER_RESET });
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h3>ORDER DETAILS</h3>
          <h3 id="order-details">{order._id}</h3>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p>
                <strong>NAME:</strong>
                {order.user.name}
              </p>
              <p>
                <strong>EMAIL:</strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>ADDRESS: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city},{order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on ${order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>
                <strong>MODE: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {new Date(order.paidAt).getDate()}/
                  {new Date(order.paidAt).getMonth() + 1}/
                  {new Date(order.paidAt).getFullYear()}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x &#8377; {item.price} = &#8377;{' '}
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>ORDER SUMMARY</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>ITEMS</Col>
                  <Col>&#8377; {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>SHIPPING</Col>
                  <Col>&#8377; {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>TAX</Col>
                  <Col>&#8377; {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>TOTAL</Col>
                  <Col>&#8377; {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {loadingDeliver && <Loader />}
              {order.isPaid &&
                userInfo &&
                userInfo.isAdmin &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button onClick={deliverHandler} className="btn btn-block">
                      MARK AS DELIVERED
                    </Button>
                  </ListGroup.Item>
                )}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <Button className="btn-block" onClick={handlePayment}>
                      PAY
                    </Button>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
