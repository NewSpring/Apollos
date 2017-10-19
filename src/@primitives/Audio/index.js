import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  PanResponder,
} from 'react-native';
import Play from '../icons/Play';
import Pause from '../icons/Pause';

export default class Audio extends Component {
  play = () => {
    this.audioFile.play();
  }

  pause = () => {
    this.audioFile.pause();
  }

  stop = () => {
    this.audioFile.currentTime = 0;
  }

  get duration() {
    return this.audioFile && this.audioFile.duration;
  }

  state = {
    progress: 0,
  };

  componentDidMount() {
    this.audioFile.canplaythrough = () => {
      console.log('is ready');
    };

    this.audioFile.onerror = () => {
      console.log('error');
    };

    this.audioFile.onplay = () => {
      console.log('play');
    };

    this.audioFile.onpause = () => {
      console.log('pause');
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

        <View>
          <View style={{ backgroundColor: 'gray', height: 20 }} />
          <View style={{ backgroundColor: 'red', height: 20, position: 'absolute', left: 0, width: `${this.state.progress * 100}%` }} />
          <View style={{ backgroundColor: 'blue', borderRadius: 9999, position: 'absolute', left: `calc(${this.state.progress * 100}% - 5px)`, height: 10, width: 10 }} />
        </View>
      </View>
    );
  }
}
