import React from 'react';
import PropTypes from 'prop-types';
import { Animated, View } from 'react-native';
import styled from '@ui/styled';

const wrapperStyles = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: -16,
  height: 16,
  alignItems: 'center',
  overflow: 'hidden',
};

const CaretScaled = styled({
  transform: [{ scaleX: 1.5 }],
})(View);

const Caret = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.primary,
  transform: [{ rotate: '45deg' }],
  width: 16,
  height: 16,
  marginTop: -10,
}))(View);

const Indicator = ({
  width,
  position,
  navigationState,
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
    <Animated.View style={{ width, transform: [{ translateX }], ...wrapperStyles }}>
      <CaretScaled><Caret /></CaretScaled>
    </Animated.View>
  );
};

Indicator.propTypes = {
  width: PropTypes.number,
  position: PropTypes.shape({ interpolate: PropTypes.func }),
  navigationState: PropTypes.shape({ routes: PropTypes.array }),
};

export default Indicator;
