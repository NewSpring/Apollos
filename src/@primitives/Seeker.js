import React, { Component } from 'react';
import {
  View,
  PanResponder,
} from 'react-native';

export default class Seeker extends Component {
  state = {
    position: 0,
    offset: 0,
    isSeeking: false,
    width: 0,
  }

  componentWillReceiveProps({ progress }) {
    if (progress !== this.props.progress) {
      this.setState({
        position: progress * this.state.width,
      });
    }
  }

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => (true),
    onPanResponderMove: (e, { dx }) => {
      this.setState({
        offset: dx,
        isSeeking: true,
      });
    },
    onPanResponderRelease: (e, { dx }) => {
      this.setState({
        position: this.state.position + dx,
        offset: 0,
        isSeeking: false,
      }, () => {
        const { onSeek } = this.props;
        if (onSeek) onSeek(this.currentProgress);
      });
    },
  });

  handleOnLayout = ({ nativeEvent: { layout: { width } } }) => {
    this.setState({
      position: ((this.state.position / this.state.width) * width || this.props.progress * width),
      width,
    });
  };

  get currentProgress() {
    return this.state.position / this.state.width;
  }

  render() {
    return (
      <View onLayout={this.handleOnLayout}>
        <View style={{ backgroundColor: 'gray', height: 20 }} />
        <View style={{ backgroundColor: 'red', height: 20, position: 'absolute', left: 0, width: this.state.position + this.state.offset }} />
        <View style={{ backgroundColor: 'blue', borderRadius: 9999, position: 'absolute', left: (this.state.position - 5) + this.state.offset, height: 10, width: 10 }} {...this.panResponder.panHandlers} />
      </View>
    );
  }
}