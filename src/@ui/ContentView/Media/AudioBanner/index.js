import React from 'react';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import ConnectedImage from '@ui/ConnectedImage';
import { withTheme } from '@ui/theme';
import { withMediaPlayerActions } from '@data/mediaPlayer';
import styled from '@ui/styled';
import Touchable from '@ui/Touchable';
import PaddedView from '@ui/PaddedView';
import Icon from '@ui/Icon';
import { H7 } from '@ui/typography';

const enhance = compose(
  pure,
  setPropTypes({
    mediaId: PropTypes.string,
    titleText: PropTypes.string,
    currentTrack: PropTypes.shape({
      title: PropTypes.string,
      file: PropTypes.string,
      duration: PropTypes.string,
    }),
    playlist: PropTypes.shape({
      title: PropTypes.string.isRequired,
      images: ConnectedImage.propTypes.source.isRequired,
      colors: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })).isRequired,
    }),
  }),
  defaultProps({
    titleText: 'Listen to audio',
  }),
  withTheme(({ theme: { helpers: { rem = {} } = {} } = {} }) => ({ rem })),
  withMediaPlayerActions,
);

const Banner = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.colors.lightTertiary, // TODO: move color into theme type
}))(PaddedView);

const AudioBanner = enhance(
  ({
    mediaId, setNowPlaying, currentTrack, playlist, titleText, rem,
  }) => (
    <Touchable onPress={() => setNowPlaying({ id: mediaId, currentTrack, playlist })}>
      <Banner>
        <View>
          <H7>{titleText}</H7>
        </View>
        <Icon name={'audio'} size={rem(1)} />
      </Banner>
    </Touchable>
  ),
);

export default AudioBanner;
