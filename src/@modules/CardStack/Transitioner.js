import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View, Easing, PanResponder } from 'react-native';
import { clamp, get } from 'lodash';
import withTheme from '@primitives/withTheme';

import interpolator from './interpolator';
import findFirstMatch from './findFirstMatch';

export const PUSH = 'PUSH';
export const POP = 'POP';
const ANIMATION_DURATION = 500;
const ANIMATION_EASING = Easing.bezier(0.2833, 0.99, 0.31833, 0.99);
const POSITION_THRESHOLD = 1 / 2;
const RESPOND_THRESHOLD = 1;
const GESTURE_RESPONSE_DISTANCE_HORIZONTAL = 40;

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

    // from withTheme HOC
    screenDark: PropTypes.string,
    screenLight: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    history: null,
    location: null,
    match: null,
    screenDark: '#000',
    screenLight: '#fff',
  };

  state = {
    transition: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key === this.props.location.key) return;
    if (nextProps.history.action === PUSH || nextProps.history.action === POP) {
      let transition = PUSH;
      let fromPosition = 0;
      let toPosition = 1;

      if (nextProps.history.action === POP) {
        transition = POP;
        fromPosition = 1;
        toPosition = 0;
      }

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

  get currentRouteChild() {
    return findFirstMatch(this.props.children, this.props.location);
  }

  get previouslyRenderedRouteChild() {
    return findFirstMatch(this.props.children, this.state.previouslyRenderedLocation);
  }

  get wouldPopToSameRouteChild() {
    return this.locationsfromSameRoute(
      this.props.location,
      get(this.props.history, `entries[${this.props.history.index - 1}]`),
    );
  }

  startingIndex = this.props.history.index;

  animatedPosition = new Animated.Value(0);

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gesture) => (
      !this.wouldPopToSameRouteChild &&
      this.props.history.index > this.startingIndex &&
      this.props.history.canGo(-1) &&
      event.nativeEvent.pageX < GESTURE_RESPONSE_DISTANCE_HORIZONTAL &&
      gesture.dx > RESPOND_THRESHOLD
    ),

    onPanResponderGrant: () => {
      this.animatedPosition.stopAnimation(() => {
        this.isPanning = true;
        // this.gestureStartValue = value;
        this.props.history.goBack();
      });
    },

    onPanResponderMove: (event, { dx }) => {
      // Handle the moving touches for our granted responder
      const startValue = 1; // todo: should we be utilizing gestureStartValue (above) somehow?
      const currentValue = startValue + (-dx / this.props.width);
      const value = clamp(0, currentValue, 1);
      this.animatedPosition.setValue(value);
    },

    onPanResponderRelease: (event, { dx, vx }) => {
      // Calculate animate duration according to gesture speed and moved distance
      const movedDistance = dx;
      const gestureVelocity = vx;
      const defaultVelocity = this.props.width / ANIMATION_DURATION;
      const velocity = Math.max(Math.abs(gestureVelocity), defaultVelocity);
      const resetDuration = movedDistance / velocity;
      const goBackDuration = (this.props.width - movedDistance) / velocity;

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
        // and the back will happen.
        if (value <= POSITION_THRESHOLD) {
          this.finishNavigationFromPan(goBackDuration);
        } else {
          this.cancelNavigationFromPan(resetDuration);
        }
      });
    },
  });

  routeChildForLocation(location) {
    return location && findFirstMatch(this.props.children, location);
  }

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
    });
  };

  renderScreens() {
    let screens = [];
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
        <Animated.View key={this.props.location.key} style={[StyleSheet.absoluteFill, { backgroundColor: 'white' }]}>
          {this.currentRouteChild}
        </Animated.View>,
      ];
    }
    return screens;
  }

  renderScreenWithAnimation = ({ index, key, screen }) => {
    const style = [
      StyleSheet.absoluteFill,
      { backgroundColor: this.props.screenLight },
      interpolator({
        ...this.props,
        index,
        transition: this.state.transition,
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
        style={[StyleSheet.absoluteFill, { backgroundColor: this.props.screenDark }]}
        {...this.panResponder.panHandlers}
      >
        {this.renderScreens()}
      </View>
    );
  }
}

export default withTheme(({ screenLight, screenDark }) =>
  ({ screenLight, screenDark }),
)(Transitioner);
