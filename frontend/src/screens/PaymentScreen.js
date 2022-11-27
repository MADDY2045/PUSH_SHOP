import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>PAYMENT METHOD</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              name="paymentMethod"
              id="PayPal"
              value="PayPal"
              label="PayPal or Credit Card"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button className="mt-3" type="submit" variant="primary">
          CONTINUE
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
