import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View, Easing, PanResponder } from 'react-native';
import { clamp, get } from 'lodash';
import styled from '@ui/styled';

import interpolator from './interpolator';
import findFirstMatch from './findFirstMatch';

export const PUSH = 'PUSH';
export const POP = 'POP';
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
  };

  // In a routing change: set up state to handle the transition and start the animation
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key === this.props.location.key) return;

    // we only care about PUSH and POP actions. (EX: REPLACE we don't want to animate)
    if (nextProps.history.action === PUSH || nextProps.history.action === POP) {
      let transition = PUSH;
      let fromPosition = 0;
      let toPosition = 1;

      if (nextProps.history.action === POP) {
        transition = POP;
        fromPosition = 1;
        toPosition = 0;
      }

      // Since ReactRouter uses a global history state, we need to figure out when we're dealing
      // with a routing change that happens inside of nested routes, as we don't want this CardStack
      // to add animation when we're transitioning between two nested routes.
      if (this.locationsfromSameRoute(this.props.location, nextProps.location)) {
        transition = null;
      }

      this.setState({
        previouslyRenderedLocation: this.props.location,
        transition,
      }, () => {
        if (
          !transition ||
          this.isPanning ||
          (nextProps.history.action === POP && nextProps.history.index < this.startingIndex)
        ) {
          return;
        }

        // Below we'll render the two routes we're animating between.
        // Here we'll animate between the two routes, where this.animatedPosition
        // refers to the index of the route.
        this.animatedPosition.setValue(fromPosition);
        this.animation = Animated.timing(this.animatedPosition, {
          duration: ANIMATION_DURATION,
          easing: ANIMATION_EASING,
          toValue: toPosition,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            this.setState({
              transition: null,
            });
            this.animatedPosition.setValue(0);
            this.animation = null;
          }
        });
      });
    }
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
        this.props.history.goBack();
      });
    },

    onPanResponderMove: (event, { dx, dy }) => {
      // current route is always the "second" (index=1) route in the stack (stack size is always 2)
      const startValue = 1;
      const dValue = this.isHorizontal ? dx : dy;
      const size = this.isHorizontal ? this.props.width : this.props.height;

      const currentValue = startValue + (-dValue / size);
      const value = clamp(0, currentValue, 1);
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
        this.props.history.goForward();
        this.afterPan();
      }
    });
  };

  finishNavigationFromPan = (duration) => {
    Animated.timing(this.animatedPosition, {
      toValue: 0,
      duration,
      easing: Easing.linear(),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        this.afterPan();
      }
    });
  };

  afterPan = () => {
    this.isPanning = false;

    this.setState({
      previouslyRenderedLocation: {},
      transition: null,
    }, () => this.animatedPosition.setValue(0));
  };

  renderScreens() {
    let screens = [];
    // This is how we emulate a CardStack with ReactRouter:
    // Essentially, our CardStack size during a transition is always 2:
    // The Screen we're navigating away from, and the Screen we're navigating to.
    if (this.state.transition === PUSH) {
      screens = [
        this.renderScreenWithAnimation({
          index: 0,
          screen: this.previouslyRenderedRouteChild,
          key: this.state.previouslyRenderedLocation.key,
        }),
        this.renderScreenWithAnimation({
          index: 1,
          screen: this.currentRouteChild,
          key: this.props.location.key,
        }),
      ];
    } else if (this.state.transition === POP || this.isPanning) {
      screens = [
        this.renderScreenWithAnimation({
          index: 0,
          screen: this.currentRouteChild,
          key: this.props.location.key,
        }),
        this.renderScreenWithAnimation({
          index: 1,
          screen: this.previouslyRenderedRouteChild,
          key: this.state.previouslyRenderedLocation.key,
        }),
      ];
    } else {
      screens = [
        this.renderScreenWithAnimation({
          index: 0,
          screen: this.currentRouteChild,
          key: this.props.location.key,
        }),
      ];
    }
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
  backgroundColor: theme.palette.black,
  ...StyleSheet.absoluteFillObject,
}), 'CardStack.Transitioner')(Transitioner);
