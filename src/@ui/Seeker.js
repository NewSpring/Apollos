import React, { Component } from 'react';
import {
  Animated,
  View,
  PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';
import { withTheme } from '@ui/theme';

export class Seeker extends Component {
  static propTypes = {
    progress: PropTypes.object, // eslint-disable-line
    onSeek: PropTypes.func,
    onSeeking: PropTypes.func,
    trackHeight: PropTypes.number,
    trackColor: PropTypes.string,
    progressHeight: PropTypes.number,
    progressColor: PropTypes.string,
    knobColor: PropTypes.string,
    knobRadius: PropTypes.number,
    knobSize: PropTypes.number,
  };

  static defaultProps = {
    progress: new Animated.Value(0),
    onSeek() {},
    onSeeking() {},
    trackHeight: 20,
    trackColor: 'gray',
    progressHeight: 20,
    progressColor: 'red',
    knobColor: 'blue',
    knobRadius: 9999,
    knobSize: 30,
  };

  state = {
    width: 0,
  }

  componentWillMount() {
    this.listen(this.props.progress);
  }

  componentWillReceiveProps({ progress }) {
    if (progress !== this.props.progress) {
      this.listen(progress);
    }
  }

  componentWillUnmount() {
    if (this.listener) this.props.progress.removeListener(this.props.progress);
  }

  listen = (progress) => {
    if (this.listener) this.props.progress.removeListener(progress);
    this.listener = progress.addListener(({ value }) => {
      this.lastProgressValue = value;
      this.lastPosition = value * this.state.width;
    });
  }

  offsetDriver = new Animated.Value(0);

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !!this.props.onSeeking,
    onPanResponderMove: (e, { dx }) => {
      this.offsetDriver.setValue(dx || 0);
      const { onSeeking } = this.props;
      onSeeking((this.lastPosition + dx) / this.state.width);
    },
    onPanResponderRelease: (e, { dx }) => {
      this.offsetDriver.setValue(0);
      const { onSeek } = this.props;
      if (onSeek) onSeek(((this.lastPosition || 0) + dx) / this.state.width);
    },
  });

  handleOnLayout = ({ nativeEvent: { layout: { width } } }) => {
    this.setState({
      width,
    });
  };

  render() {
    const {
      trackHeight,
      trackColor,
      progressHeight,
      progressColor,
      knobColor,
      knobRadius,
      knobSize,
    } = this.props;

    const position = Animated.multiply(this.props.progress, this.state.width);
    const offset = this.offsetDriver;

    const trackBarWidth = Animated.add(position, offset);

    return (
      <View onLayout={this.handleOnLayout}>
        <View
          style={{
            backgroundColor: trackColor,
            height: trackHeight,
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            backgroundColor: progressColor,
            height: progressHeight,
            width: trackBarWidth,
            transform: [
              { translateY: (trackHeight - progressHeight) / 2 },
            ],
          }}
        />
        <Animated.View
          style={{
            backgroundColor: knobColor,
            borderRadius: knobRadius,
            position: 'absolute',
            left: -(knobSize / 2),
            height: knobSize,
            width: knobSize,
            transform: [
              { translateX: trackBarWidth },
              { translateY: (trackHeight - knobSize) / 2 },
            ],
          }}
          {...this.panResponder.panHandlers}
        />
      </View>
    );
  }
}

export default withTheme(({ theme, ...otherProps } = {}) => ({
  progressColor: theme.colors.primary,
  knobColor: theme.colors.secondary,
  trackColor: theme.colors.darkPrimary,
  ...otherProps,
}))(Seeker);
