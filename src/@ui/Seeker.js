import React, { Component } from 'react';
import {
  Animated,
  View,
  PanResponder,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Color from 'color';
import styled from '@ui/styled';
import { withTheme } from '@ui/theme';

const Container = styled(({ theme }) => ({
  minWidth: '65%',
  marginHorizontal: theme.sizing.baseUnit,
  overflow: 'visible',
}), 'Seeker.Container')(View);

const Track = styled(({ theme }) => ({
  backgroundColor: Color(theme.colors.text.primary).fade(theme.alpha.medium).string(),
  height: theme.sizing.borderRadius,
  borderRadius: theme.sizing.borderRadius,
  overflow: 'hidden',
}), 'Seeker.Track')(View);

const ProgressBar = styled(({ theme }) => ({
  backgroundColor: theme.colors.text.primary,
  ...StyleSheet.absoluteFillObject,
}), 'Seeker.ProgressBar')(View);

const Knob = styled(({ theme }) => ({
  backgroundColor: theme.colors.text.primary,
  borderRadius: theme.sizing.baseUnit,
  position: 'absolute',
  top: 0,
  right: 0,
  height: theme.sizing.baseUnit,
  width: theme.sizing.baseUnit,
  elevation: 2,
  zIndex: 100,
}), 'Seeker.Knob')(View);

export class Seeker extends Component {
  static propTypes = {
    progress: PropTypes.object, // eslint-disable-line
    onSeek: PropTypes.func,
    onSeeking: PropTypes.func,
    theme: PropTypes.shape({
      sizing: PropTypes.shape({
        borderRadius: PropTypes.number,
        baseUnit: PropTypes.number,
      }),
    }),
  };

  static defaultProps = {
    progress: new Animated.Value(0),
    onSeek() {},
    onSeeking() {},
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
      let offset = dx;
      offset = Math.min(this.state.width - this.lastPosition, offset);
      offset = Math.max(-this.lastPosition, offset);
      this.offsetDriver.setValue(offset || 0);

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
    const progressInvert = Animated.add(1, Animated.multiply(this.props.progress, -1));
    const position = Animated.multiply(progressInvert, -this.state.width);
    const offset = this.offsetDriver;

    const trackBarOffset = Animated.add(position, offset);

    const { theme } = this.props;

    return (
      <Container onLayout={this.handleOnLayout}>
        <Track>
          <Animated.View
            style={[StyleSheet.absoluteFill, {
              transform: [{ translateX: trackBarOffset }],
            }]}
          >
            <ProgressBar />
          </Animated.View>
        </Track>
        <Animated.View
          style={{
            position: 'absolute',
            right: -(theme.sizing.baseUnit / 2),
            top: (theme.sizing.borderRadius / 2) - (theme.sizing.baseUnit / 2),
            bottom: (theme.sizing.borderRadius / 2) - (theme.sizing.baseUnit / 2),
            width: '100%',
            overflow: 'visible',
            transform: [
              { translateX: trackBarOffset },
            ],
          }}
        >
          <Knob {...this.panResponder.panHandlers} />
        </Animated.View>
      </Container>
    );
  }
}

export default withTheme(({ theme, ...otherProps } = {}) => ({
  theme,
  progressColor: theme.colors.primary,
  knobColor: theme.colors.secondary,
  trackColor: theme.colors.darkPrimary,
  ...otherProps,
}))(Seeker);
