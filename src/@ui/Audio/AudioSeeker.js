import React, { PureComponent } from 'react';
import { Animated, View } from 'react-native';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Seeker from '@ui/Seeker';
import { UIText } from '@ui/typography';
import styled from '@ui/styled';
import TimeElapsed from './TimeElapsed';

const Container = styled({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
})(View);

export class AudioSeeker extends PureComponent {
  static propTypes = {
    seek: PropTypes.func.isRequired,
    seekingHandler: PropTypes.func,
    progress: PropTypes.object, // eslint-disable-line
    component: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
    duration: PropTypes.string,
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
      duration,
      component: Component,
      ...otherProps
    } = this.props;

    return (
      <Container>
        <TimeElapsed />
        <Component
          progress={progress}
          onSeek={seek}
          onSeeking={seekingHandler}
          {...otherProps}
        />
        <UIText>{duration}</UIText>
      </Container>
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
