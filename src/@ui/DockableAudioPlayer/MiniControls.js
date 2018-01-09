import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { View } from 'react-native';
import Icon from '@ui/Icon';
import Touchable from '@ui/Touchable';
import ConnectedImage from '@ui/ConnectedImage';
import SafeAreaView from '@ui/SafeAreaView';
import { UIText } from '@ui/typography';
import styled from '@ui/styled';
import { withThemeMixin } from '@ui/theme';

const TrackInfo = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(View);

const FlexRow = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit / 4,
  alignItems: 'stretch',
  flexDirection: 'row',
  justifyContent: 'space-between',
}))(View);

const Container = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.default,
}), 'MiniControls')(SafeAreaView);

const enhance = compose(
  setPropTypes({
    isPlaying: PropTypes.bool,
    play: PropTypes.func,
    pause: PropTypes.func,
    skip: PropTypes.func,
    trackName: PropTypes.string,
    trackByLine: PropTypes.string,
    albumArt: ConnectedImage.propTypes.albumArt,
  }),
  withThemeMixin({ type: 'dark' }),
);

const MiniControls = enhance(({
  isPlaying, play, pause, skip, trackName, trackByLine, albumArt,
}) => (
  <Container>
    <FlexRow>
      <FlexRow>
        <ConnectedImage source={albumArt} maintainAspectRatio />
        <TrackInfo>
          <UIText>{trackName}</UIText>
          <UIText>{trackByLine}</UIText>
        </TrackInfo>
      </FlexRow>
      <FlexRow>
        {(isPlaying) ? (
          <Touchable onPress={pause}><Icon name="pause" /></Touchable>
        ) : (
          <Touchable onPress={play}><Icon name="play" /></Touchable>
        )}
        {(skip) ? (
          <Touchable onPress={skip}><Icon name="skip-next" /></Touchable>
        ) : null}
      </FlexRow>
    </FlexRow>
  </Container>
));

export default MiniControls;
