import React, { PureComponent } from 'react';
import { StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import ScreenOrientation from '@utils/orientation';
import VideoPlayer, { Video } from '@ui/VideoPlayer';
import FlexedView from '@ui/FlexedView';

import Controls from './Controls';

class RotatingVideoPlayer extends PureComponent {
  static propTypes = {
    src: PropTypes.string,
    poster: PropTypes.any, // eslint-disable-line
    ...Video.propTypes,
  };

  state = {
    isPlaying: false,
  }

  componentWillMount() {
    if (Platform.OS === 'web') return; // don't care about this stuff on web
    Dimensions.addEventListener('change', this.handleOrientationSwitch);
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
  }

  componentWillUnmount() {
    if (Platform.OS === 'web') return; // don't care about this stuff on web
    Dimensions.removeEventListener('change', this.handleOrientationSwitch);
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  get posterSource() {
    if (this.props.poster && !this.props.poster.uri) {
      return { uri: (this.props.poster.url || this.props.poster).replace(/^http:\/\/|^\/\//i, 'https://') };
    }
    return this.props.poster;
  }

  controlsOpacity = new Animated.Value(1);

  handleOrientationSwitch = ({ window: { width, height } }) => {
    const isLandscape = width > height;
    if (this.isLandscape !== isLandscape) {
      if (isLandscape) {
        this.goFullscreen();
      } else {
        ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
        this.exitFullscreen();
      }
    }
    this.isLandscape = isLandscape;
  }

  handleFullscreenUpdate = ({ fullscreenUpdate }) => {
    if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS) {
      ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
    }
  }

  handlePlaybackstatus = ({ isPlaying }) => {
    if (this.state.isPlaying !== isPlaying) this.setState({ isPlaying });
  }

  playPause = () => {
    if (this.state.isPlaying) {
      this.video.pauseAsync();
    } else {
      this.video.playAsync();
    }
  }

  goFullscreen = () => {
    this.video.presentFullscreenPlayer();
    this.video.playAsync();
  }

  exitFullscreen = () => {
    this.video.dismissFullscreenPlayer();
  }

  render() {
    const { src, style, ...otherProps } = this.props;
    return (
      <FlexedView style={style}>
        <VideoPlayer
          videoRef={(r) => { this.video = r; }}
          onPlaybackStatusUpdate={this.handlePlaybackstatus}
          onFullscreenUpdate={this.handleFullscreenUpdate}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          source={{ uri: src }}
          useNativeControls={false}
          usePoster
          posterSource={this.posterSource}
          style={StyleSheet.absoluteFill}
          {...otherProps}
        />
        <Controls
          isPlaying={this.state.isPlaying}
          fullscreen={this.goFullscreen}
          playPause={this.playPause}
        />
      </FlexedView>
    );
  }
}

export default RotatingVideoPlayer;
