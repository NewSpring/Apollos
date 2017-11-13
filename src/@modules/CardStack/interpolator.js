const interpolator = ({
  animatedPosition, index, width,
}) => {
  const opacity = animatedPosition.interpolate({
    inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
    outputRange: [0, 1, 1, 0.85, 0],
  });

  const translateX = animatedPosition.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, width * -0.3],
  });

  return ({
    opacity,
    transform: [{ translateX }],
  });
};

export default interpolator;
