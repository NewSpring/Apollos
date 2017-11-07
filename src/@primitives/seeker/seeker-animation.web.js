import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

const styles = StyleSheet.create({
  default: {
    width: '100%',
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

  constructor(props) {
    super(props);

    this.progressAnimation = {
      entering: {
        transition: `transform ${this.props.duration}ms`,
        transform: [{ translateX: `${this.getPercetOfProgress()}%` }],
      },
      entered: {
        transform: [{ translateX: 0 }],
      },
    };
  }

  getPercetOfProgress() {
    let progressValue = 0;

    if (this.props.progress > 0) {
      progressValue = ((this.props.progress / this.props.duration) * 100) - 100;
    }

    return progressValue;
  }

  render() {
    console.count();

    return (
      <Transition appear in timeout={300}>
        {(status) => {
          console.log(status);
          return (
            <View style={{ ...styles.default, ...this.progressAnimation[status] }}>
              {this.props.children}
            </View>
          );
        }}
      </Transition>
    );
  }
}

export default SeekerAnimation;
