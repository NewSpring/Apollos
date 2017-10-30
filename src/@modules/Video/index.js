import React, { Component } from 'react';
import { Video as ExpoVideo } from 'expo';
import PropTypes from 'prop-types';
import {
  View,
  Dimensions,
} from 'react-native';
import VideoPlay from './VideoPlay';
import VideoPause from './VideoPause';
import VideoSeeker from './VideoSeeker';

export default class Video extends Component {
  static Play = VideoPlay;
  static Pause = VideoPause;
  static Seeker = VideoSeeker;

  static propTypes = {
    source: PropTypes.string.isRequired,
    onReady: PropTypes.func,
    onError: PropTypes.func,
    onPlaybackReachedEnd: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onStop: PropTypes.func,
    onSeek: PropTypes.func,
    onSeeking: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    onReady() {},
    onError(err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    },
    onPlaybackReachedEnd() {},
    onPlay() {},
    onPause() {},
    onStop() {},
    onSeek() {},
    onSeeking() {},
    children: null,
  };

  static childContextTypes = {
    play: PropTypes.func,
    stop: PropTypes.func,
    pause: PropTypes.func,
    seek: PropTypes.func,
    progress: PropTypes.number,
    seekingHandler: PropTypes.func,
  };

  state = {
    progress: 0,
    videoRatio: 1,
  };

  getChildContext = () => ({
    play: this.play,
    stop: this.stop,
    pause: this.pause,
    seek: this.seek,
    progress: this.state.progress,
    seekingHandler: this.handleSeeking,
  });

  componentWillUnmount() {
    this.removeStatusListener();
  }

  duration = 0;
  positionListener = undefined;
  previousVideoStatus = undefined;
  isReady = false;
  playbackEnded = false;

  play = async () => {
    try {
      if (this.playbackEnded) await this.Video.stopAsync();
      if (this.isReady) {
        this.Video.playAsync();
        this.props.onPlay();
      }
    } catch (err) {
      this.props.onError(err);
    }
  }

  pause = async () => {
    try {
      this.Video.pauseAsync();
      this.props.onPause();
    } catch (err) {
      this.props.onError(err);
    }
  }

  stop = async () => {
    try {
      this.Video.stopAsync();
      this.props.onStop();
    } catch (err) {
      this.props.onError(err);
    }
  }

  seek = (percentageOfVideo) => {
    const positionInMillis = this.duration * percentageOfVideo;
    // NOTE: For some reason this isn't being set (it's being set in increments of 4 seconds only)
    this.Video.setPositionAsync(positionInMillis);
    this.props.onSeek(positionInMillis);
  }

  handleSeeking = (percentageOfVideo) => {
    const positionInMillis = this.duration * percentageOfVideo;
    this.props.onSeeking(positionInMillis);
  }

  createStatusListener = () => {
    this.positionListener = setInterval(async () => {
      try {
        const videoStatus = await this.Video.getStatusAsync();
        this.setState({
          progress: videoStatus.positionMillis / this.duration,
        });

        const currentIsFinished = videoStatus.positionMillis === this.duration;
        const previousIsFinished = this.previousVideoStatus.positionMillis === this.duration;
        if (currentIsFinished && !previousIsFinished) {
          this.pause();
          this.props.onPlaybackReachedEnd();
        }
        this.previousVideoStatus = videoStatus;

        if (currentIsFinished) {
          this.playbackEnded = true;
        } else {
          this.playbackEnded = false;
        }
      } catch (err) {
        this.props.onError(err);
      }
    }, 200);
  }

  removeStatusListener = () => {
    if (this.positionListener) clearInterval(this.positionListener);
  }

  identifyVideoDimensions = ({ naturalSize: { height, width } }) => {
    this.setState({
      videoRatio: height / width,
    });
  }

  handleOnLoad = async () => {
    const {
      onReady,
      onError,
    } = this.props;

    try {
      const videoStatus = await this.Video.getStatusAsync();
      this.previousVideoStatus = videoStatus;
      this.duration = videoStatus.durationMillis;
      this.createStatusListener();
      this.isReady = true;
      onReady();
    } catch (err) {
      onError(err);
    }
  }

  render() {
    const {
      source,
      children,
      onError,
    } = this.props;

    const { width } = Dimensions.get('window');
    const height = this.state.videoRatio * width;

    return (
      <View>
        <ExpoVideo
          ref={(r) => { this.Video = r; }}
          source={{ uri: source }}
          resizeMode="contain"
          onReadyForDisplay={this.identifyVideoDimensions}
          style={{ width, height }}
          onError={onError}
          onLoad={this.handleOnLoad}
        />
        {children}
      </View>
    );
  }
}
