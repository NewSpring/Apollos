import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { withThemeMixin } from '@ui/theme';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
import SafeAreaView from '@ui/SafeAreaView';
import GradientOverlayImage from '@ui/GradientOverlayImage';
import Icon from '@ui/Icon';
import Audio from '@ui/Audio';
import Touchable from '@ui/Touchable';
import { H7, H5, H4 } from '@ui/typography';
import { Link } from '@ui/NativeWebRouter';
import styled from '@ui/styled';

const Container = styled(({ theme, backgroundColor }) => ({
  backgroundColor: backgroundColor || theme.colors.background.default,
  justifyContent: 'space-between',
}))(BackgroundView);

const Titles = styled({
  alignItems: 'center',
  paddingVertical: 0,
})(PaddedView);

const TrackName = styled({ textAlign: 'center' })(H4);
const ByLine = styled({ textAlign: 'center' })(H7);

const PlayerBody = styled({
  flex: 1,
  justifyContent: 'space-around',
})(SafeAreaView);

const Controls = styled({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
})(View);

const Settings = styled({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})(PaddedView);

const Ellipsis = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 4,
  opacity: theme.alpha.medium,
}))(props => <H5 {...props}>•••</H5>);

const IconWithActiveOpacity = styled(({ theme, active }) => ({
  opacity: active ? 1 : theme.alpha.low,
}))(Icon);

const enhance = compose(
  withThemeMixin(({ isLight }) => ({ type: isLight ? 'light' : 'dark' })),
  setPropTypes({
    isPlaying: PropTypes.bool,
    duration: PropTypes.string,
    play: PropTypes.func,
    pause: PropTypes.func,
    next: PropTypes.func,
    prev: PropTypes.func,
    trackName: PropTypes.string,
    trackByLine: PropTypes.string,
    albumArt: PropTypes.any, // eslint-disable-line
    color: PropTypes.string,
    isLight: PropTypes.bool,
    isShuffling: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    isRepeating: PropTypes.bool,
    handleShuffle: PropTypes.func,
    handleRepeat: PropTypes.func,
    trackInfoLink: PropTypes.string,
    playlist: PropTypes.shape({
      tracks: PropTypes.array,
    }),
  }),
);

const FullScreenControls = enhance(
  ({
    isPlaying,
    duration,
    play,
    pause,
    next,
    prev,
    trackName,
    trackByLine,
    albumArt,
    color,
    isShuffling,
    isRepeating,
    handleShuffle,
    handleRepeat,
    trackInfoLink,
    playlist,
  }) => (
    <Container backgroundColor={color}>
      <GradientOverlayImage source={albumArt} overlayColor={color} />
      <PlayerBody>
        <Titles>
          <TrackName>{trackName}</TrackName>
          <ByLine>{trackByLine}</ByLine>
        </Titles>
        <Controls>
          <PaddedView>
            <Touchable onPress={prev}>
              <Icon name="skip-previous" size={32} />
            </Touchable>
          </PaddedView>
          <PaddedView>
            <Touchable onPress={isPlaying ? pause : play}>
              <Icon name={isPlaying ? 'pause' : 'play'} size={48} />
            </Touchable>
          </PaddedView>
          <PaddedView>
            <Touchable onPress={next}>
              <Icon name="skip-next" size={32} />
            </Touchable>
          </PaddedView>
        </Controls>
        <PaddedView>
          <Audio.Seeker duration={duration} />
        </PaddedView>
        {playlist && playlist.tracks.length > 1 ? (
          <Settings>
            <PaddedView>
              <Touchable onPress={handleShuffle}>
                <IconWithActiveOpacity active={isShuffling} name="shuffle" size={24} />
              </Touchable>
            </PaddedView>
            <PaddedView>
              <Touchable onPress={handleRepeat}>
                <IconWithActiveOpacity active={isRepeating} name="repeat" size={24} />
              </Touchable>
            </PaddedView>
            <PaddedView>
              <Link to={trackInfoLink}>
                <Ellipsis />
              </Link>
            </PaddedView>
          </Settings>
        ) : null}
        <Controls>
          <Link pop>
            <PaddedView>
              <Icon name="arrow-down" />
            </PaddedView>
          </Link>
        </Controls>
      </PlayerBody>
    </Container>
  ),
);

export default FullScreenControls;
