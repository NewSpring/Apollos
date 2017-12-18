import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import withDefaultProgressColors from './withDefaultProgressColors';

const enhance = compose(
  withDefaultProgressColors,
);

const styles = StyleSheet.create({
  track: {
    width: '100%',
    height: 6,
  },
});

class Progress extends PureComponent {
  static propTypes = {
    progress: PropTypes.number,
    trackColor: PropTypes.string,
    color: PropTypes.string,
  };

  static defaultProps = {
    progress: 0,
    trackColor: 'transparent',
  };

  state = { layoutWidth: 0 };

  componentDidMount() {
    this.updateProgress();
  }

  componentDidUpdate() {
    this.updateProgress();
  }

  get animatedBarStyle() {
    const scaleX = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.00001, 1],
    });

    const translateX = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.state.layoutWidth / -2, 0],
    });

    return {
      transform: [{ translateX }, { scaleX }],
    };
  }

  animationValue = new Animated.Value(0);

  updateProgress = () => {
    Animated.spring(this.animationValue, {
      toValue: this.props.progress,
      isInteraction: false,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  }

  handleLayout = ({ nativeEvent: { layout } }) => {
    if (this.state.layoutWidth !== layout.width) this.setState({ layoutWidth: layout.width });
  }

  render() {
    const trackColor = { backgroundColor: this.props.trackColor };
    const barColor = { backgroundColor: this.props.color };
    return (
      <View style={[styles.track, trackColor]} onLayout={this.handleLayout}>
        <Animated.View style={[StyleSheet.absoluteFill, barColor, this.animatedBarStyle]} />
      </View>
    );
  }
}

export default enhance(Progress);
