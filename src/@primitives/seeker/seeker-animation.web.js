import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  default: {
    width: '100%',
    transform: [{
      translateX: 0,
    }],
  },
});

export class SeekerAnimation extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    duration: PropTypes.number.isRequired,
    progress: PropTypes.number,
  };

  static defaultProps = {
    progress: 0,
  };

  getPercetOfProgress() {
    let progressValue = 0;

    if (this.props.progress > 0) {
      progressValue = ((this.props.progress / this.props.duration) * 100) - 100;
    }

    return progressValue;
  }

  render() {
    // WIP – this doesn't work 😢
    const progressStyle = [styles.default, {
      transition: `transform ${this.props.duration}ms`,
      transform: [{
        translateX: `${this.getPercetOfProgress()}%`,
      }],
    }];

    return (
      <View style={progressStyle}>
        {this.props.children}
      </View>
    );
  }
}

export default SeekerAnimation;
