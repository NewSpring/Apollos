import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
} from 'react-native';
import { Audio as ExpoAudio } from 'expo';
import PropTypes from 'prop-types';
import Play from '../../@primitives/icons/Play';
import Pause from '../../@primitives/icons/Pause';
import Seeker from '../../@primitives/Seeker';

export default class Audio extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    onReady: PropTypes.func,
  };

  static defaultProps = {
    onReady() {},
  }

  state = {
    progress: 0,
  };

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

  play = () => {
    if (this.isReady) this.Sound.playAsync();
  }

  pause = () => {
    this.Sound.pauseAsync();
  }

  stop = () => {
    this.Sound.stopAsync();
  }

  seek = (percentageOfSong) => {
    this.Sound.setPositionAsync(this.duration * percentageOfSong);
  }

  loadSource = async () => {
    try {
      const { source, onReady } = this.props;
      const soundStatus = await this.Sound.loadAsync({ uri: source });
      this.previousSoundStatus = soundStatus;
      this.duration = soundStatus.durationMillis;
      this.createStatusListener();
      this.isReady = true;
      onReady();
    } catch (err) {
      console.log(err);
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
          console.log('ended');
        }
        this.previousSoundStatus = soundStatus;
      } catch (err) {
        console.log(err);
      }
    }, 200);
  }

  removeStatusListener = () => {
    if (this.positionListener) clearInterval(this.positionListener);
  }

  render() {
    return (
      <View style={{ height: 100 }}>
        <TouchableHighlight onPress={this.play}>
          <View>
            <Play />
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.pause}>
          <View>
            <Pause />
          </View>
        </TouchableHighlight>

        <Seeker
          progress={this.state.progress}
          onSeek={this.seek}
        />
      </View>
    );
  }
}
