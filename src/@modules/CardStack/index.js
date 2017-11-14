import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '../NativeWebRouter';

const CardStack = ({ children }) => (
  <Switch>
    {children}
  </Switch>
);

CardStack.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardStack;
