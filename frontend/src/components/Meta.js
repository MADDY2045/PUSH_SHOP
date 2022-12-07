import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title> {title}</title>
      <meta content={description} name="description"></meta>
      <meta content={keywords} name="keywords"></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Push Shop',
  description: 'We sell quality products',
  keywords: 'best electronics,cheap electronics',
};

export default Meta;
