import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardContent } from '@ui/Card';
import { H4, H7 } from '@ui/typography';
import styled from '@ui/styled';

const Header = styled({ textAlign: 'center' }, 'Error.Header')(H4);
const ErrorText = styled({ textAlign: 'center' }, 'Error.Text')(H7);

const Err = ({ message = 'Uh oh!', error }) => {
  let errorMessage;
  if (typeof error !== 'string') {
    if (error && error.message) {
      errorMessage = error.message;
    } else if (error && error.error && typeof error.error === 'string') {
      errorMessage = error.error;
    } else {
      errorMessage = 'An unexpected error occured';
    }
  } else {
    errorMessage = error;
  }

  return (
    <Card>
      <CardContent>
        <Header>{message}</Header>
        <ErrorText>{errorMessage}</ErrorText>
      </CardContent>
    </Card>
  );
};

Err.propTypes = {
  message: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Err;
