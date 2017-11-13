import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View, Easing, PanResponder } from 'react-native';
import { clamp } from 'lodash';
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
  };

  static defaultProps = {
    children: null,
    history: null,
    location: null,
    match: null,
  };

  state = {
    transition: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key === this.props.location.key) return;

    const childToParent = nextProps.match.isExact && !this.props.match.isExact;
    const parentToChild = !nextProps.match.isExact && this.props.match.isExact;

    if (childToParent || parentToChild) {
      let transition = PUSH;
      let fromPosition = 0;
      let toPosition = 1;

      if (childToParent || nextProps.history.action === POP) {
        transition = POP;
        fromPosition = 1;
        toPosition = 0;
      }
      this.setState({
        previousLocation: this.props.location,
        transition,
      }, () => {
        if (this.isPanning) return;

        // Don't animate on nested routes. We can check for nested routes by comparing
        // computedMatch.path - both the current and last route will be pointing to the
        // same "route" === same match)
        if (this.lastAndCurrentRoute.current.props.computedMatch.path
          === this.lastAndCurrentRoute.last.props.computedMatch.path
        ) {
          this.setState({ transition: null });
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

  get lastAndCurrentRoute() {
    const current = findFirstMatch(this.props.children, this.props.location);

    if (!this.state.previousLocation) {
      return { current };
    }

    const last = findFirstMatch(this.props.children, this.state.previousLocation);

    return { current, last };
  }

  startingIndex = this.props.history.index;

  animatedPosition = new Animated.Value(0);

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gesture) => (
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
      previousLocation: {},
      transition: null,
    });
  };

  renderScreens() {
    let screens = [];
    if (this.state.transition === PUSH) {
      screens = [
        this.renderScreenWithAnimation({
          index: 0,
          screen: this.lastAndCurrentRoute.last,
          key: this.state.previousLocation.key,
        }),
        this.renderScreenWithAnimation({
          index: 1,
          screen: this.lastAndCurrentRoute.current,
          key: this.props.location.key,
        }),
      ];
    } else if (this.state.transition === POP || this.isPanning) {
      screens = [
        this.renderScreenWithAnimation({
          index: 0,
          screen: this.lastAndCurrentRoute.current,
          key: this.props.location.key,
        }),
        this.renderScreenWithAnimation({
          index: 1,
          screen: this.lastAndCurrentRoute.last,
          key: this.state.previousLocation.key,
        }),
      ];
    } else {
      screens = [
        <Animated.View key={this.props.location.key} style={[StyleSheet.absoluteFill, { backgroundColor: 'white' }]}>
          {this.lastAndCurrentRoute.current}
        </Animated.View>,
      ];
    }
    return screens;
  }

  renderScreenWithAnimation = ({ index, key, screen }) => {
    const style = [
      StyleSheet.absoluteFill,
      { backgroundColor: 'white' }, // todo
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
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#000' }]} {...this.panResponder.panHandlers}>
        {this.renderScreens()}
      </View>
    );
  }
}

export default Transitioner;
