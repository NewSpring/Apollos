import React, { Component, Children } from 'react';
import { Audio as ExpoAudio } from 'expo';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import AudioPlay from './AudioPlay';
import AudioPause from './AudioPause';
import AudioSeeker from './AudioSeeker';

export default class Audio extends Component {
  static Play = AudioPlay;
  static Pause = AudioPause;
  static Seeker = AudioSeeker;

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
    children: null,
    isPlaying: false,
  };

  static childContextTypes = {
    play: PropTypes.func,
    stop: PropTypes.func,
    pause: PropTypes.func,
    seek: PropTypes.func,
  };

  state = {
    progress: 0,
  };

  getChildContext = () => ({
    play: this.play,
    stop: this.stop,
    pause: this.pause,
    seek: this.seek,
  });

  componentWillMount() {
    ExpoAudio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });

    this.loadSource();
  }

  componentDidUpdate({ source, isPlaying }) {
    if (this.props.source !== source) {
      this.loadSource();
    } else if (this.props.isPlaying !== isPlaying) {
      if (this.props.isPlaying) this.play();
      if (!this.props.isPlaying) this.pause();
    }
  }

  componentWillUnmount() {
    this.sound.unloadAsync();
  }

  onPlaybackStatusUpdate = (soundStatus) => {
    this.setState({
      progress: soundStatus.positionMillis / this.duration,
    });

    if (soundStatus.didJustFinish) {
      this.props.onPlaybackReachedEnd();
    }
  }

  duration = 0;
  positionListener = undefined;
  previousSoundStatus = undefined;
  isReady = false;
  playState = this.props.isPlaying;

  play = async () => {
    if (this.sound) {
      try {
        await this.sound.playAsync();
        this.props.onPlay();
      } catch (err) {
        this.props.onError(err);
      }
    }
  }

  pause = async () => {
    if (this.sound) {
      try {
        await this.sound.pauseAsync();
        this.props.onPause();
      } catch (err) {
        this.props.onError(err);
      }
    }
  }

  stop = async () => {
    try {
      this.sound.stopAsync();
      this.props.onStop();
    } catch (err) {
      this.props.onError(err);
    }
  }

  seek = (percentageOfSong) => {
    const positionInMillis = this.duration * percentageOfSong;
    this.sound.setPositionAsync(positionInMillis);
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

    const uri = source.replace(/^http:\/\/|^\/\//i, 'https://');

    try {
      if (this.sound) {
        await this.sound.pauseAsync();
        await this.sound.unloadAsync();
        delete this.sound;
      }

      this.sound = await new ExpoAudio.Sound();

      const soundStatus = await this.sound.loadAsync({ uri });
      this.duration = soundStatus.durationMillis;

      this.sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);

      if (this.props.isPlaying) await this.play();
      onReady();
    } catch (err) {
      onError(err);
    }
  }

  render() {
    const children = Children.map(this.props.children, child => (
      React.cloneElement(child, {
        progress: this.state.progress,
        seekingHandler: this.handleSeeking,
      })
    ));
    return <View>{children}</View>;
  }
}
