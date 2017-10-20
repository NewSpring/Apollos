import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
} from 'react-native';
import { Audio as ExpoAudio } from 'expo';
import Play from '../../@primitives/icons/Play';
import Pause from '../../@primitives/icons/Pause';
import Seeker from '../../@primitives/Seeker';

export default class Audio extends Component {
  constructor() {
    super();
    this.Sound = new ExpoAudio.Sound();
    this.loadSource();
  }

  state = {
    progress: 0,
  };

  play = () => {
    this.Sound.playAsync();
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

  duration = 0;
  positionListener = undefined;

  loadSource = async () => {
    try {
      const soundStatus = await this.Sound.loadAsync({ uri: 'https://www.w3schools.com/html/horse.mp3' });
      console.log(soundStatus);
      this.duration = soundStatus.durationMillis;
      this.createStatusListener();
      console.log('is ready');
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
        if (soundStatus.positionMillis === this.duration) {
          this.pause();
          console.log('ended');
        }
      } catch (err) {
        console.log(err);
      }
    }, 200);
  }

  componentWillUnmount() {
    this.Sound.unloadAsync();
    clearInterval(this.positionListener);
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
