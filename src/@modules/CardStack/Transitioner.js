import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View, Easing } from 'react-native';
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
    }),
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    match: PropTypes.shape({
      isExact: PropTypes.bool,
    }),
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

  animatedPosition = new Animated.Value(0);

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
    } else if (this.state.transition === POP) {
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
        this.renderScreenWithAnimation({
          index: 0,
          screen: this.lastAndCurrentRoute.current,
          key: this.props.location.key,
        }),
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
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#000' }]}>
        {this.renderScreens()}
      </View>
    );
  }
}

export default Transitioner;
