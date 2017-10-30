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

  // componentWillUnmount() {
  //   this.removeStatusListener();
  // }

  duration = 0;
  positionListener = undefined;
  previousSoundStatus = undefined;
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

  seek = (percentageOfSong) => {
    const positionInMillis = this.duration * percentageOfSong;
    this.Video.setPositionAsync(positionInMillis);
    this.props.onSeek(positionInMillis);
  }

  handleSeeking = (percentageOfSong) => {
    const positionInMillis = this.duration * percentageOfSong;
    this.props.onSeeking(positionInMillis);
  }

  // createStatusListener = () => {
  //   this.positionListener = setInterval(async () => {
  //     try {
  //       const soundStatus = await this.Video.getStatusAsync();
  //       this.setState({
  //         progress: soundStatus.positionMillis / this.duration,
  //       });

  //       const currentIsFinished = soundStatus.positionMillis === this.duration;
  //       const previousIsFinished = this.previousSoundStatus.positionMillis === this.duration;
  //       if (currentIsFinished && !previousIsFinished) {
  //         this.pause();
  //         this.props.onPlaybackReachedEnd();
  //       }
  //       this.previousSoundStatus = soundStatus;

  //       if (currentIsFinished) {
  //         this.playbackEnded = true;
  //       } else {
  //         this.playbackEnded = false;
  //       }
  //     } catch (err) {
  //       this.props.onError(err);
  //     }
  //   }, 200);
  // }

  // removeStatusListener = () => {
  //   if (this.positionListener) clearInterval(this.positionListener);
  // }

  identifyVideoDimensions = ({ naturalSize: { height, width } }) => {
    this.setState({
      videoRatio: height / width,
    });
  }

  handleOnLoad = () => {
    this.isReady = true;
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
