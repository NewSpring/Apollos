import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
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
    onError() {
      // eslint-disable-next-line no-console
      console.error('Failed to load video file');
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
  };

  getChildContext = () => ({
    play: this.play,
    stop: this.stop,
    pause: this.pause,
    seek: this.seek,
    progress: this.state.progress,
    seekingHandler: this.seekingHandler,
  });

  componentDidMount() {
    this.videoFile.oncanplaythrough = () => {
      if (!this.isReady) this.props.onReady();
      this.isReady = true;
    };

    this.videoFile.onerror = () => {
      this.props.onError();
    };

    this.videoFile.onended = () => {
      this.props.onPlaybackReachedEnd();
    };

    this.videoFile.onplay = () => {
      this.props.onPlay();
    };

    this.videoFile.onpause = () => {
      this.props.onPause();
    };

    this.createStatusListener();
  }

  componentWillUnmount() {
    this.removeStatusListener();
  }

  get duration() {
    return this.videoFile && this.videoFile.duration;
  }

  positionListener = undefined;
  isReady = false;

  play = () => {
    if (this.isReady) this.videoFile.play();
  }

  pause = () => {
    this.videoFile.pause();
  }

  stop = () => {
    this.videoFile.pause();
    this.videoFile.currentTime = 0;
    this.props.onStop();
  }

  seek = (percentageOfSong) => {
    const positionInSeconds = this.duration * percentageOfSong;
    this.videoFile.currentTime = positionInSeconds;

    const positionInMillis = positionInSeconds * 1000;
    this.props.onSeek(positionInMillis);
  }

  handleSeeking = (percentageOfSong) => {
    const positionInSeconds = this.duration * percentageOfSong;
    const positionInMillis = positionInSeconds * 1000;
    this.props.onSeeking(positionInMillis);
  }

  createStatusListener = () => {
    this.positionListener = setInterval(() => {
      this.setState({
        progress: this.videoFile.currentTime / this.duration,
      });
    }, 200);
  }

  removeStatusListener = () => {
    if (this.positionListener) clearInterval(this.positionListener);
  }

  render() {
    const {
      source,
    } = this.props;

    return (
      <View>
        <video
          ref={(r) => { this.videoFile = r; }}
        >
          <source src={source} type="video/mp4" />
        </video>
        {this.props.children}
      </View>
    );
  }
}
