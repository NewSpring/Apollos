import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

const wrapperStyles = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  height: 3,
};

const Indicator = ({
  width,
  position,
  navigationState,
  indicatorColor: backgroundColor,
}) => {
  const translateX = Animated.multiply(
    position.interpolate({
      inputRange: [0, navigationState.routes.length - 1],
      outputRange: [0, navigationState.routes.length - 1],
      extrapolate: 'clamp',
    }),
    width,
  );
  return (
    <Animated.View
      style={{
        width, backgroundColor, transform: [{ translateX }], ...wrapperStyles,
      }}
    />
  );
};

Indicator.propTypes = {
  width: PropTypes.number,
  position: PropTypes.shape({ interpolate: PropTypes.func }),
  navigationState: PropTypes.shape({ routes: PropTypes.array }),
  indicatorColor: PropTypes.string,
};

export default Indicator;
