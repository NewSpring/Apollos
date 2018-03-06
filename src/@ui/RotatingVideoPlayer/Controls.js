import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from '@ui/Icon';
import Touchable from '@ui/Touchable';
import styled from '@ui/styled';

const ControlsContainer = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.overlay,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  ...StyleSheet.absoluteFillObject,
}))(View);

const Control = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 3,
  height: theme.sizing.baseUnit * 3,
  borderRadius: theme.sizing.baseUnit * 3,
  backgroundColor: theme.colors.background.darkOverlay,
  margin: theme.sizing.baseUnit,
  alignItems: 'center',
  justifyContent: 'center',
}))(View);

class Controls extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool,
    playPause: PropTypes.func,
    fullscreen: PropTypes.func,
  }

  componentWillReceiveProps({ isPlaying }) {
    if (this.props.isPlaying !== isPlaying) {
      this.isVisible = !isPlaying;
      Animated.spring(this.controlsOpacity, {
        toValue: isPlaying ? 0 : 1,
        useNativeDriver: true,
      }).start();
    }
  }

  componentWillUnmount() {
    if (this.controllerFade) clearTimeout(this.controllerFade);
  }

  controlsOpacity = new Animated.Value(1);

  handlePlayPause = () => {
    if (this.isVisible) {
      this.props.playPause();
    } else {
      this.handleControlsPress();
    }
  }

  handleFullscreen = () => {
    if (this.isVisible) {
      this.props.fullscreen();
    } else {
      this.handleControlsPress();
    }
  }

  handleControlsPress = () => {
    Animated.spring(this.controlsOpacity, {
      toValue: this.isVisible ? 0 : 1,
      useNativeDriver: true,
    }).start(() => {
      this.controllerFade = setTimeout(() => {
        if (this.props.isPlaying) {
          this.isVisible = false;
          Animated.spring(this.controlsOpacity, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      }, 3500);
    });
    this.isVisible = !this.isVisible;
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handleControlsPress}>
        <Animated.View style={{ opacity: this.controlsOpacity, ...StyleSheet.absoluteFillObject }}>
          <ControlsContainer>
            <Control>
              <Touchable onPress={this.handlePlayPause}>
                <Icon name={this.props.isPlaying ? 'pause' : 'play'} fill="white" />
              </Touchable>
            </Control>
            <Control>
              <Touchable onPress={this.handleFullscreen}>
                <Icon name="fullscreen" fill="white" />
              </Touchable>
            </Control>
          </ControlsContainer>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Controls;
