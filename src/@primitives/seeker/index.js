import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import withTheme from '../withTheme';

const styles = StyleSheet.create({
  track: {
    height: 20,
    width: '100%',
    position: 'absolute',
    top: 5,
  },
  progressWrapper: {
    paddingVertical: 5,
    paddingRight: 5,
  },
  progressBar: {
    height: 20,
    width: '100%',
  },
  knob: {
    borderRadius: 50,
    position: 'absolute',
    top: 5,
    right: 0,
    height: 30,
    width: 30,
    transform: [{ translateY: (20 - 30) / 2 }],
  },
});

export class Seeker extends PureComponent {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    progress: PropTypes.number,
    trackColor: PropTypes.string,
    progressColor: PropTypes.string,
    knobColor: PropTypes.string,
  };

  static defaultProps = {
    progress: 0,
    trackColor: 'gray',
    progressColor: 'red',
    knobColor: 'blue',
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
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const trackStyle = [styles.track, { backgroundColor: this.props.trackColor }];
    const animatedProgress = [styles.progressWrapper, {
      transform: [{
        translateX: Animated.multiply(this.width, Animated.add(-1, this.animatedPosition)),
      }],
    }];
    const progressStyle = [styles.progressBar, { backgroundColor: this.props.progressColor }];
    const knobStyle = [styles.knob, { backgroundColor: this.props.knobColor }];

    return (
      <View>
        <View
          style={trackStyle}
          onLayout={Animated.event([{ nativeEvent: { layout: { width: this.width } } }])}
        />
        <Animated.View style={animatedProgress}>
          <View style={progressStyle} />
          <View style={knobStyle} />
        </Animated.View>
      </View>
    );
  }
}

export default withTheme(({ theme, ...otherProps } = {}) => ({
  progressColor: theme.primaryColor,
  knobColor: theme.secondaryColor,
  trackColor: theme.darkPrimaryColor,
  ...otherProps,
}))(Seeker);
