import { Animated } from 'react-native';
import { POP, PUSH } from './Transitioner';

const interpolator = ({
  transition, animatedPosition, index, width,
}) => {
   // // Animate new page in
  // if (transition === PUSH && index === 1) {
  //   style = {
  //     transform: [
  //       { translateX: Animated.add(Animated.multiply(-width, animatedIndex), width) },
  //     ],
  //   };
  // }

  // // Animated old page out

  // return style;
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
