import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form className="m-3" onSubmit={submitHandler} style={{ display: 'flex' }}>
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        placeholder="Search Products.."
        className="mr-sm-2 ml-sm-5 mr-3"
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type="submit" className="p-2" variant="outline-success">
        SEARCH
      </Button>
    </Form>
  );
};

export default SearchBox;
