import React from 'react';
import { Text } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import withTheme from '@primitives/withTheme';

const enhance = compose(
  pure,
  withTheme(({ theme: { baseFontColor } }) => ({ baseFontColor })),
  setPropTypes({
    children: PropTypes.node,
    style: Text.propTypes.style,
  }),
);

const H7 = enhance(({
  children,
  style: styleProp = {},
  baseFontColor,
  ...otherProps
}) => {
  const tempStyle = { // TODO: replace this with passing theme props into our styled HOC
    color: baseFontColor,
  };

  return (
    <Text
      style={[tempStyle, styleProp]}
      {...otherProps}
    >
      {children}
    </Text>
  );
});

export default H7;
