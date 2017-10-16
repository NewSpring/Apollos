import React from 'react';
import MediaQuery from './index';

export default props => (
  <MediaQuery maxWidth={575} {...props} />
);
