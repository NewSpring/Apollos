import React from 'react';
import MediaQuery from './index';

export default props => (
  <MediaQuery minWidth={576} {...props} />
);
