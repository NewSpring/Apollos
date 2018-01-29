import React, { Component } from 'react';
import { Audio as ExpoAudio } from 'expo';
import PropTypes from 'prop-types';
import { Animated, View } from 'react-native';
import AudioPlay from './AudioPlay';
import AudioPause from './AudioPause';
import AudioSeeker from './AudioSeeker';

export default class Audio extends Component {
  static Play = AudioPlay;
  static Pause = AudioPause;
  static Seeker = AudioSeeker;

  static propTypes = {
    source: PropTypes.string,
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
    style: PropTypes.any, // eslint-disable-line
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
    progress: PropTypes.object,
    positionMillis: PropTypes.object,
    seekingHandler: PropTypes.func,
  };

  getChildContext = () => ({
    play: this.play,
    stop: this.stop,
    pause: this.pause,
    seek: this.seek,
    progress: this.progressDriver,
    positionMillis: this.positionMillisDriver,
    seekingHandler: this.handleSeeking,
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
    if (this.sound) this.sound.unloadAsync();
  }

  onPlaybackStatusUpdate = (soundStatus) => {
    this.positionMillisDriver.setValue(soundStatus.positionMillis);
    this.progressDriver.setValue((soundStatus.positionMillis / this.duration) || 0);

    if (soundStatus.didJustFinish) {
      this.props.onPlaybackReachedEnd(this.sound);
    }
  }

  positionMillisDriver = new Animated.Value(0);
  progressDriver = new Animated.Value(0);
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

    if (!source) return;
    const uri = source.replace(/^http:\/\/|^\/\//i, 'https://');

    try {
      if (this.sound && this.soundLoaded === this.sound) {
        await this.sound.unloadAsync();
      }

      const sound = this.sound = await new ExpoAudio.Sound(); // eslint-disable-line
      const soundStatus = await this.sound.loadAsync({ uri });
      this.soundLoaded = this.sound;

      if (sound === this.sound) { // since the above calls are promise base, there's a chance that
      // the current sound changes before this sound is loaded (pressing skip button quickly).
      // We don't want to start playing this sound in that scenario :)
        this.duration = soundStatus.durationMillis;
        this.sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
        if (this.props.isPlaying) await this.play();
      }

      onReady();
    } catch (err) {
      onError(err);
    }
  }

  render() {
    return <View style={this.props.style}>{this.props.children}</View>;
  }
}
