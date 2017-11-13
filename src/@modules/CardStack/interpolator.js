const interpolator = ({
  animatedPosition, index, width,
}) => {
  // animatedPosition = aniamted index of the active route
  // index = index of the route we're interpolating
  // For example, during a PUSH route transition, animatedPosition
  // would animate from 0 to 1. The route at index 0 we'd want to fade
  // offscreen, and the route at 1 we'd want to move into view and fade in.

  const translateX = animatedPosition.interpolate({
    // The easy way to read this is by starting with the middle number:
    // - When animatedPosition == index that means this route is the current route,
    //   so we want translateX to be 0.
    // - At index - 1, that means that animatedPosition is before this route
    //   (the current route could be index==1, and animatedPosition is at 0). So,
    //   we want translateX to be equal to the width of the component to push it offscreen.
    // - At index + 1, animatedPosition is beyond this route, and we want the route
    //   at index to be pushed offscreen to the left.
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, width * -0.3],
  });

  const opacity = animatedPosition.interpolate({
    // This is similar to translateX above, except there are extra "keyframes" at index - 0.99 and
    // index + 0.99 to finer tune the transition (and better emulate what's seen on native OS).
    // These values were ripped from NavigationExperimental / react-navigation.
    inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
    outputRange: [0, 1, 1, 0.85, 0],
  });

  return ({
    opacity,
    transform: [{ translateX }],
  });
};

export default interpolator;
