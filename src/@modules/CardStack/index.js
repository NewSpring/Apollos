import React from 'react';
import { Switch } from '../NativeWebRouter';

const CardStack = ({ children }) => {
  return (
    <Switch>
      {children}
    </Switch>
  );
};

export default CardStack;
