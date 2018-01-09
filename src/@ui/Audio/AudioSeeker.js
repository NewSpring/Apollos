import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Seeker from '@ui/Seeker';

export class AudioSeeker extends PureComponent {
  static propTypes = {
    seek: PropTypes.func.isRequired,
    seekingHandler: PropTypes.func,
    progress: PropTypes.object, // eslint-disable-line
    component: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    seekingHandler() {},
    progress: new Animated.Value(0),
    component: Seeker,
  };

  render() {
    const {
      seek,
      seekingHandler,
      progress,
      component: Component,
      ...otherProps
    } = this.props;

    return (
      <Component
        progress={progress}
        onSeek={seek}
        onSeeking={seekingHandler}
        {...otherProps}
      />
    );
  }
}

const enhance = compose(
  getContext({
    seek: PropTypes.func,
    progress: PropTypes.object,
    seekingHandler: PropTypes.func,
  }),
);

export default enhance(AudioSeeker);
