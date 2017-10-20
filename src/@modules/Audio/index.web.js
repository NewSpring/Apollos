import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
} from 'react-native';
import Play from '../../@primitives/icons/Play';
import Pause from '../../@primitives/icons/Pause';
import Seeker from '../../@primitives/Seeker';

export default class Audio extends Component {
  state = {
    progress: 0,
  };

  play = () => {
    this.audioFile.play();
  }

  pause = () => {
    this.audioFile.pause();
  }

  stop = () => {
    this.audioFile.currentTime = 0;
  }

  seek = (percentageOfSong) => {
    this.audioFile.currentTime = this.duration * percentageOfSong;
  }

  get duration() {
    return this.audioFile && this.audioFile.duration;
  }

  positionListener = undefined;

  componentDidMount() {
    this.audioFile.canplaythrough = () => {
      console.log('is ready');
    };

    this.audioFile.onerror = () => {
      console.log('error');
    };

    this.audioFile.onended = () => {
      console.log('ended');
    };

    this.positionListener = setInterval(() => {
      this.setState({
        progress: this.audioFile.currentTime / this.duration,
      });
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.positionListener);
  }

  render() {
    return (
      <View>
        <audio
          ref={(r) => { this.audioFile = r; }}
        >
          <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
        </audio>

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
