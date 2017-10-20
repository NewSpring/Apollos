import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import Play from '../../@primitives/icons/Play';
import Pause from '../../@primitives/icons/Pause';
import Seeker from '../../@primitives/Seeker';

export default class Audio extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    onReady: PropTypes.func,
    onError: PropTypes.func,
    onPlaybackReachedEnd: PropTypes.func,
  };

  static defaultProps = {
    onReady() {},
    onError() {
      console.error('Failed to load audio file');
    },
    onPlaybackReachedEnd() {},
  };

  state = {
    progress: 0,
  };

  componentDidMount() {
    this.audioFile.oncanplaythrough = () => {
      if (!this.isReady) this.props.onReady();
      this.isReady = true;
    };

    this.audioFile.onerror = () => {
      this.props.onError();
    };

    this.audioFile.onended = () => {
      this.props.onPlaybackReachedEnd();
    };
    this.createStatusListener();
  }

  componentWillUnmount() {
    this.removeStatusListener();
  }

  get duration() {
    return this.audioFile && this.audioFile.duration;
  }

  positionListener = undefined;
  isReady = false;

  play = () => {
    if (this.isReady) this.audioFile.play();
  }

  pause = () => {
    this.audioFile.pause();
  }

  stop = () => {
    this.audioFile.pause();
    this.audioFile.currentTime = 0;
  }

  seek = (percentageOfSong) => {
    this.audioFile.currentTime = this.duration * percentageOfSong;
  }

  createStatusListener = () => {
    this.positionListener = setInterval(() => {
      this.setState({
        progress: this.audioFile.currentTime / this.duration,
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
        <audio
          ref={(r) => { this.audioFile = r; }}
        >
          <source src={source} type="audio/mpeg" />
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
