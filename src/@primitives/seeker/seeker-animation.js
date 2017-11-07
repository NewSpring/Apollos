import React, { PureComponent } from 'react';
import {
  Animated,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

export class SeekerAnimation extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    duration: PropTypes.number.isRequired,
    progress: PropTypes.number,
  };

  static defaultProps = {
    progress: 0,
  };

  constructor(props) {
    super(props);

    this.animatedPosition = new Animated.Value(this.getPercetOfProgress());
    this.width = new Animated.Value(1);
  }

  componentDidMount() {
    this.animatePosition();
  }

  componentWillUpdate() {
    this.animatePosition();
  }

  getPercetOfProgress() {
    let progressValue = 0;

    if (this.props.progress > 0) {
      progressValue = this.props.progress / this.props.duration;
    }

    return progressValue;
  }

  animatePosition() {
    Animated.timing(this.animatedPosition, {
      toValue: 1,
      duration: this.props.duration * (1 - this.getPercetOfProgress()),
      useNativeDriver: true,
    }).start();
  }

  render() {
    const progressStyle = {
      transform: [{
        translateX: Animated.multiply(this.width, Animated.add(-1, this.animatedPosition)),
      }],
    };

    return (
      <View onLayout={Animated.event([{ nativeEvent: { layout: { width: this.width } } }])}>
        <Animated.View style={progressStyle}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}

export default SeekerAnimation;
