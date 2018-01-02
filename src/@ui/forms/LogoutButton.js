import React from 'react';
import { compose, withProps } from 'recompose';
import withUser from '@data/withUser';
import Button from '@ui/Button';

export const LogoutButtonWithoutData = props => (
  <Button title="Logout" {...props} />
);

const withData = compose(
  withUser,
  withProps(({ logout }) => ({ onPress: logout })),
);

export default withData(LogoutButtonWithoutData);

