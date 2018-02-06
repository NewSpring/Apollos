import React, { PureComponent } from 'react';
import { Animated, View } from 'react-native';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Seeker from '@ui/Seeker';
import { H7 } from '@ui/typography';
import styled from '@ui/styled';
import TimeElapsed from './TimeElapsed';

const Container = styled({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
})(View);

const fixedWidth = styled({ width: 50, textAlign: 'center', alignItems: 'center' });
const StyledTimeElapsed = fixedWidth(TimeElapsed);
const DurationText = fixedWidth(H7);

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
        <StyledTimeElapsed />
        <Component
          progress={progress}
          onSeek={seek}
          onSeeking={seekingHandler}
          {...otherProps}
        />
        <DurationText>{duration}</DurationText>
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
