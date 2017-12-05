import React, { Component } from 'react';
import {
  View,
  PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';
import { withTheme } from '@ui/theme';

export class Seeker extends Component {
  static propTypes = {
    progress: PropTypes.number,
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
    progress: 0,
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
    position: 0,
    offset: 0,
    width: 0,
  }

  componentWillReceiveProps({ progress }) {
    if (progress !== this.props.progress) {
      this.setState({
        position: progress * this.state.width,
      });
    }
  }

  get currentProgress() {
    return this.state.position / this.state.width;
  }

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => (true),
    onPanResponderMove: (e, { dx }) => {
      this.setState({
        offset: dx,
      });
      const { onSeeking } = this.props;
      onSeeking((this.state.position + dx) / this.state.width);
    },
    onPanResponderRelease: (e, { dx }) => {
      this.setState({
        position: this.state.position + dx,
        offset: 0,
      }, () => {
        const { onSeek } = this.props;
        if (onSeek) onSeek(this.currentProgress);
      });
    },
  });

  handleOnLayout = ({ nativeEvent: { layout: { width } } }) => {
    this.setState({
      position: ((this.state.position / this.state.width) * width || this.props.progress * width),
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

    const {
      position,
      offset,
    } = this.state;

    return (
      <View onLayout={this.handleOnLayout}>
        <View
          style={{
            backgroundColor: trackColor,
            height: trackHeight,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            backgroundColor: progressColor,
            height: progressHeight,
            width: position + offset,
            transform: [
              { translateY: (trackHeight - progressHeight) / 2 },
            ],
          }}
        />
        <View
          style={{
            backgroundColor: knobColor,
            borderRadius: knobRadius,
            position: 'absolute',
            left: (position - (knobSize / 2)) + offset,
            height: knobSize,
            width: knobSize,
            transform: [
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
  progressColor: theme.colors.common.primary,
  knobColor: theme.colors.common.secondary,
  trackColor: theme.colors.common.darkPrimary,
  ...otherProps,
}))(Seeker);
