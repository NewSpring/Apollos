import React from 'react';
import { Text } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import withTheme from '@primitives/withTheme';

const enhance = compose(
  pure,
  withTheme(({ theme: { primaryColor } }) => ({ primaryColor })),
  setPropTypes({
    children: PropTypes.node,
    style: Text.propTypes.style,
  }),
);

const H1 = enhance(({
  children,
  style: styleProp = {},
  primaryColor,
  ...otherProps
}) => {
  const dynamicStyle = { // TODO: replace this with passing theme props into our styled HOC
    color: primaryColor,
  };

  return (
    <Text
      style={[dynamicStyle, styleProp]}
      {...otherProps}
    >
      {children}
    </Text>
  );
});

export default H1;
