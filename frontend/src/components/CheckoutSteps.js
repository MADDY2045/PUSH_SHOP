import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>
              <small>SIGN IN</small>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <small>SIGN IN</small>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>
              <small>SHIPPING</small>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <small>SHIPPING</small>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>
              <small>PAYMENT</small>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <small>PAYMENT</small>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>
              <small>PLACE ORDER</small>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <small>PLACE ORDER</small>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
