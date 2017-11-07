import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import withTheme from '../withTheme';
import SeekerAnimation from './seeker-animation';

const styles = StyleSheet.create({
  track: {
    height: 20,
    width: '100%',
  },
  progressBar: {
    height: 20,
    width: '100%',
    position: 'absolute',
  },
  knob: {
    borderRadius: 50,
    position: 'absolute',
    right: 0,
    height: 30,
    width: 30,
    transform: [
      { translateX: 30 / 2 },
      { translateY: (20 - 30) / 2 },
    ],
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

  render() {
    const trackStyle = [styles.track, { backgroundColor: this.props.trackColor }];
    const progressStyle = [styles.progressBar, { backgroundColor: this.props.progressColor }];
    const knobStyle = [styles.knob, { backgroundColor: this.props.knobColor }];

    return (
      <View style={trackStyle}>
        <SeekerAnimation progress={this.props.progress} duration={this.props.duration}>
          <View style={progressStyle}>
            <View style={knobStyle} />
          </View>
        </SeekerAnimation>
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
