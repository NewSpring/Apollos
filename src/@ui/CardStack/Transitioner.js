import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform, Animated, StyleSheet, View, Easing, PanResponder } from 'react-native';
import { clamp, get, findIndex } from 'lodash';
import styled from '@ui/styled';

import interpolator from './interpolator';
import findFirstMatch from './findFirstMatch';

export const PUSH = 'PUSH';
export const POP = 'POP';
export const REPLACE = 'REPLACE';
const ANIMATION_DURATION = 500;
const ANIMATION_EASING = Easing.bezier(0.2833, 0.99, 0.31833, 0.99);
const POSITION_THRESHOLD = 1 / 2;
const RESPOND_THRESHOLD = 1;
const GESTURE_RESPONSE_DISTANCE_HORIZONTAL = 25;
const GESTURE_RESPONSE_DISTANCE_VERTICAL = 135;

// Transitioner essentially emulates the functionality of a CardStack
// by pulling out the routes involved in a transition, stacking them,
// and animating their position. When using this component, it becomes
// very important to use `.push` and `.goBack` appropriately.
class Transitioner extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.shape({
      action: PropTypes.string,
      index: PropTypes.number,
      canGo: PropTypes.func,
      goBack: PropTypes.func,
      entries: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
      })).isRequired,
      goForward: PropTypes.func,
      push: PropTypes.func,
    }),
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    match: PropTypes.shape({
      isExact: PropTypes.bool,
    }),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    directionPropNameForChildren: PropTypes.string,
    style: PropTypes.any, // eslint-disable-line
  };

  static defaultProps = {
    children: null,
    history: null,
    location: null,
    match: null,
    direction: 'horizontal',
    directionPropNameForChildren: 'cardStackDirection',
    style: undefined,
  };

  state = {
    transition: null,
    entries: [this.props.location],
    index: 0,
  };

  // In a routing change: set up state to handle the transition and start the animation
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key === this.props.location.key) return;

    let { entries } = this.state;
    let transition = nextProps.history.action;

    // If new location and current location point to same route,
    // change entry at current index and exit (no animation)
    if (this.locationsfromSameRoute(this.props.location, nextProps.location)) {
      entries[this.state.index] = nextProps.location;
      this.setState(entries);
      return;
    }

    let toPosition = this.state.index;

    switch (nextProps.history.action) {
      case PUSH: {
        // If the next <Route> doesn't have a path, we know we are pushing from
        // an inner page to a root-level page, and we should show a POP animation instead
        const nextRouteChild = this.routeChildForLocation(nextProps.location);
        if (!nextRouteChild.props.path && !nextRouteChild.props.to) {
          entries = [nextProps.location, this.props.location];
          toPosition = 0;
          transition = POP;
        } else {
          // otherwise, insert route at next place in stack
          entries.splice(this.state.index + 1, 0, nextProps.location);
          toPosition = this.state.index + 1;
        }
        break;
      }
      case POP:
        toPosition = findIndex(entries, ({ key }) => key === nextProps.location.key);
        if (toPosition < 0) {
          entries = [nextProps.location, ...entries];
          toPosition = 0;
        }
        break;
      case REPLACE:
      default:
        entries[this.state.index] = nextProps.location;
        break;
    }

    const fromPosition = findIndex(entries, ({ key }) => key === this.props.location.key);

    this.setState({
      entries,
      previouslyRenderedLocation: this.props.location,
      index: toPosition,
      transition,
    }, () => {
      if (
        !transition ||
        this.isPanning ||
        (nextProps.history.action === POP && nextProps.history.index < this.startingIndex)
      ) {
        return;
      }

      this.animatePosition(fromPosition, toPosition);
    });
  }

  componentWillUnmount() {
    if (this.animation) this.animation.stop();
  }

  // Finds the first matching <Route> in children. Works like ReactRouter's <Switch>
  get currentRouteChild() {
    return findFirstMatch(this.props.children, this.props.location);
  }

  // Finds the <Route> that was previously active in children.
  get previouslyRenderedRouteChild() {
    return findFirstMatch(this.props.children, this.state.previouslyRenderedLocation);
  }

  // Determines if the previous location in history points at the same <Route> that's active.
  // Used to keep us from swiping back on a screen that we shouldn't be able to swipe back from
  get wouldPopToSameRouteChild() {
    return this.locationsfromSameRoute(
      this.props.location,
      get(this.props.history, `entries[${this.props.history.index - 1}]`),
    );
  }

  get direction() {
    let child = this.currentRouteChild;
    if (this.state.transition === POP) child = this.previouslyRenderedRouteChild;
    return get(child, `props.${this.props.directionPropNameForChildren}`, this.props.direction);
  }

  get isHorizontal() {
    return this.direction === 'horizontal';
  }

  get isVertical() {
    return this.direction === 'vertical';
  }

  startingIndex = this.props.history.index;

  // Points to the index of the current screen rendered in `renderScreens`
  animatedPosition = new Animated.Value(0);

  animatePosition = (fromPosition, toPosition) => {
    if (Platform.OS === 'web') {
      this.animatedPosition.setValue(toPosition);
      this.afterNavigate();
      return;
    }

    // Here we'll animate between routes, where this.animatedPosition
    // refers to the index of the route.
    this.animatedPosition.setValue(fromPosition);
    this.animation = Animated.timing(this.animatedPosition, {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
      toValue: toPosition,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        this.afterNavigate();
        this.animation = null;
      }
    });
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gesture) => (
      !this.wouldPopToSameRouteChild &&
      this.props.history.index > this.startingIndex &&
      this.props.history.canGo(-1) &&
      (
        (
          this.isHorizontal &&
          event.nativeEvent.pageX < GESTURE_RESPONSE_DISTANCE_HORIZONTAL &&
          gesture.dx > RESPOND_THRESHOLD
        ) || (
          this.isVertical &&
          event.nativeEvent.pageY < GESTURE_RESPONSE_DISTANCE_VERTICAL &&
          gesture.dy > RESPOND_THRESHOLD
        )
      )
    ),

    onPanResponderGrant: () => {
      this.animatedPosition.stopAnimation(() => {
        this.isPanning = true;
      });
    },

    onPanResponderMove: (event, { dx, dy }) => {
      const startValue = this.state.index;
      const dValue = this.isHorizontal ? dx : dy;
      const size = this.isHorizontal ? this.props.width : this.props.height;

      const currentValue = startValue + (-dValue / size);
      const value = clamp(startValue - 1, currentValue, startValue);
      this.animatedPosition.setValue(value);
    },

    onPanResponderRelease: (event, {
      dx, vx, dy, vy,
    }) => {
      // Calculate animate duration according to gesture speed and moved distance
      const movedDistance = this.isHorizontal ? dx : dy;
      const gestureVelocity = this.isHorizontal ? vx : vy;
      const size = this.isHorizontal ? this.props.width : this.props.height;
      const defaultVelocity = size / ANIMATION_DURATION;
      const velocity = Math.max(Math.abs(gestureVelocity), defaultVelocity);
      const resetDuration = movedDistance / velocity;
      const goBackDuration = (size - movedDistance) / velocity;

      // To asyncronously get the current animated value, we need to run stopAnimation:
      this.animatedPosition.stopAnimation((value) => {
        // If the speed of the gesture release is significant, use that as the indication of intent
        if (gestureVelocity < -0.5) {
          this.cancelNavigationFromPan(resetDuration);
          return;
        }
        if (gestureVelocity > 0.5) {
          this.finishNavigationFromPan(goBackDuration);
          return;
        }

        // Then filter based on the distance the screen was moved. Over a third of the way swiped,
        // and the back transition will will happen.
        if (value <= POSITION_THRESHOLD) {
          this.finishNavigationFromPan(goBackDuration);
        } else {
          this.cancelNavigationFromPan(resetDuration);
        }
      });
    },
  });

  // Finds the first matching <Route> for a given location object in props.children
  routeChildForLocation(location) {
    return location && findFirstMatch(this.props.children, location);
  }

  // Determines if two locations would be driven by the same <Route> in props.children
  locationsfromSameRoute(locationA, locationB) {
    return get(this.routeChildForLocation(locationA), 'props.computedMatch.path') ===
      get(this.routeChildForLocation(locationB), 'props.computedMatch.path');
  }

  cancelNavigationFromPan = (duration) => {
    this.animation = Animated.timing(this.animatedPosition, {
      toValue: 1,
      duration,
      easing: Easing.linear(),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        this.afterPan();
      }
    });
  };

  finishNavigationFromPan = (duration) => {
    this.props.history.goBack();
    Animated.timing(this.animatedPosition, {
      toValue: Math.max(this.state.index - 1, 0),
      duration,
      easing: Easing.linear(),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        this.afterNavigate();
        this.afterPan();
      }
    });
  };

  afterPan = () => {
    this.isPanning = false;

    this.setState({
      previouslyRenderedLocation: {},
    });
  };

  afterNavigate = () => {
    this.setState({
      transition: null,
      entries: this.state.entries.slice(0, this.state.index + 1),
    });
  }

  renderScreens() {
    const screens = this.state.entries
      .filter(entry => this.routeChildForLocation(entry))
      .map((entry, index) => (
        this.renderScreenWithAnimation({
          index,
          screen: this.routeChildForLocation(entry),
          key: entry.key,
        })
      ));
    return screens;
  }

  renderScreenWithAnimation = ({ index, key, screen }) => {
    const style = [
      StyleSheet.absoluteFill,
      interpolator({
        ...this.props,
        direction: this.direction,
        index,
        animatedPosition: this.animatedPosition,
      }),
    ];
    return (
      <Animated.View key={key} style={style}>
        {screen}
      </Animated.View>
    );
  }

  render() {
    return (
      <View
        style={this.props.style}
        {...this.panResponder.panHandlers}
      >
        {this.renderScreens()}
      </View>
    );
  }
}

export default styled(({ theme }) => ({
  backgroundColor: theme.colors.black,
  ...StyleSheet.absoluteFillObject,
}), 'CardStack.Transitioner')(Transitioner);
