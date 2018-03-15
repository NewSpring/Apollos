import React from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { compose, setPropTypes } from 'recompose';
import { View, StyleSheet } from 'react-native';
import SafeAreaView from '@ui/SafeAreaView';
import Icon from '@ui/Icon';
import Touchable from '@ui/Touchable';
import ConnectedImage from '@ui/ConnectedImage';
import { H7, H6 } from '@ui/typography';
import styled from '@ui/styled';
import { withThemeMixin } from '@ui/theme';

import MiniControlsThumbnail from './MiniControlsThumbnail';

const TrackInfo = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(View);

const TrackName = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  overflow: 'hidden',
}))(H6);

const TrackLabel = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  overflow: 'hidden',
}))(H7);

const FlexRow = styled(({ theme, height }) => ({
  height,
  padding: theme.sizing.baseUnit / 4,
  alignItems: 'stretch',
  flexDirection: 'row',
  justifyContent: 'flex-start',
}))(View);

const Container = styled(
  ({ theme }) => ({
    overflow: 'hidden',
    backgroundColor: theme.colors.background.default,
    borderTopColor: Color(theme.colors.background.default)
      .darken(0.2)
      .string(),
    borderTopWidth: StyleSheet.hairlineWidth,
  }),
  'MiniControls',
)(SafeAreaView);

const Controls = styled(
  ({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: theme.sizing.baseUnit * 4,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  }),
  'MiniControls.ControlsContainer',
)(Container);

const enhance = compose(
  setPropTypes({
    isPlaying: PropTypes.bool,
    play: PropTypes.func,
    pause: PropTypes.func,
    dismiss: PropTypes.func,
    trackName: PropTypes.string,
    trackByLine: PropTypes.string,
    albumArt: ConnectedImage.propTypes.source,
    height: PropTypes.number,
  }),
  withThemeMixin({ type: 'dark' }),
);

const MiniControls = enhance(
  ({
    isPlaying, play, pause, dismiss, trackName, trackByLine, albumArt, height,
  }) => (
    <Container>
      <FlexRow height={height}>
        <MiniControlsThumbnail onPress={dismiss} isPlaying={isPlaying} source={albumArt} />
        <TrackInfo>
          <TrackName>{trackName}</TrackName>
          <TrackLabel>{trackByLine}</TrackLabel>
        </TrackInfo>
      </FlexRow>
      <Controls>
        {isPlaying ? (
          <Touchable onPress={pause}>
            <Icon name="pause" />
          </Touchable>
        ) : (
          <Touchable onPress={play}>
            <Icon name="play" />
          </Touchable>
        )}
      </Controls>
    </Container>
  ),
);

export default MiniControls;
