import React, { Component } from 'react';
import { Audio as ExpoAudio } from 'expo';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import AudioControls from './AudioControls';
import AudioSeeker from './AudioSeeker';

export default class Audio extends Component {
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
    isPlaying: PropTypes.bool,
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
    isPlaying: false,
  };

  static childContextTypes = {
    stop: PropTypes.func,
  };

  state = {
    isPlaying: this.props.isPlaying,
    progress: 0,
  };

  getChildContext = () => ({
    stop: this.stop,
  });

  componentWillMount() {
    this.Sound = new ExpoAudio.Sound();
    this.loadSource();
  }

  componentWillUnmount() {
    this.Sound.unloadAsync();
    this.removeStatusListener();
  }

  duration = 0;
  positionListener = undefined;
  previousSoundStatus = undefined;
  isReady = false;
  playbackEnded = false;

  play = async () => {
    try {
      if (this.playbackEnded) await this.Sound.stopAsync();
      if (this.isReady) {
        this.Sound.playAsync();
        this.props.onPlay();
        this.setState({
          isPlaying: true,
        });
      }
    } catch (err) {
      this.props.onError(err);
    }
  }

  pause = async () => {
    try {
      this.Sound.pauseAsync();
      this.props.onPause();
      this.setState({
        isPlaying: false,
      });
    } catch (err) {
      this.props.onError(err);
    }
  }

  stop = async () => {
    try {
      this.Sound.stopAsync();
      this.props.onStop();
    } catch (err) {
      this.props.onError(err);
    }
  }

  seek = (percentageOfSong) => {
    const positionInMillis = this.duration * percentageOfSong;
    this.Sound.setPositionAsync(positionInMillis);
    this.props.onSeek(positionInMillis);
  }

  handleSeeking = (percentageOfSong) => {
    const positionInMillis = this.duration * percentageOfSong;
    this.props.onSeeking(positionInMillis);
  }

  loadSource = async () => {
    const {
      source,
      onReady,
      onError,
    } = this.props;

    try {
      const soundStatus = await this.Sound.loadAsync({ uri: source });
      this.previousSoundStatus = soundStatus;
      this.duration = soundStatus.durationMillis;
      this.createStatusListener();
      this.isReady = true;
      onReady();
    } catch (err) {
      onError(err);
    }
  }

  createStatusListener = () => {
    this.positionListener = setInterval(async () => {
      try {
        const soundStatus = await this.Sound.getStatusAsync();
        this.setState({
          progress: soundStatus.positionMillis / this.duration,
        });

        const currentIsFinished = soundStatus.positionMillis === this.duration;
        const previousIsFinished = this.previousSoundStatus.positionMillis === this.duration;
        if (currentIsFinished && !previousIsFinished) {
          this.pause();
          this.props.onPlaybackReachedEnd();
        }
        this.previousSoundStatus = soundStatus;

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

  render() {
    return (
      <View>
        <AudioControls
          onPlay={this.play}
          onPause={this.pause}
          isPlaying={this.state.isPlaying}
        />
        <AudioSeeker
          progress={this.state.progress}
          seekingHandler={this.handleSeeking}
        />
      </View>
    );
  }
}
