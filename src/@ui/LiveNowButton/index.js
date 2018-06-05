import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { compose, setPropTypes } from 'recompose';
import { withThemeMixin } from '@ui/theme';
import withLiveNow from '@data/withLiveNow';
import { Link } from '@ui/NativeWebRouter';
import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';
import { H7 } from '@ui/typography';

const Container = styled(({ theme }) => ({
  backgroundColor: theme.colors.secondary,
  paddingVertical: theme.sizing.baseUnit / 2,
}))(PaddedView);

const Title = styled({ textAlign: 'center' })(H7);

const enhance = compose(
  setPropTypes({ titleText: PropTypes.string, liveNowPath: PropTypes.string }),
  withThemeMixin({ type: 'dark' }),
  withLiveNow,
);

const LiveNowButton = enhance(
  ({
    error,
    isLive,
    titleText = 'NewSpring Church Live. Watch Now!',
    liveNowPath = 'https://live.newspring.cc',
  }) => {
    if (error || !isLive || Platform.OS === 'web') return null;
    return (
      <Link to={liveNowPath}>
        <Container>
          <Title>{titleText}</Title>
        </Container>
      </Link>
    );
  },
);

export default LiveNowButton;
