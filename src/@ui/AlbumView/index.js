import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import { View, Platform, StyleSheet } from 'react-native';
import PaddedView from '@ui/PaddedView';
import ProgressiveImage from '@ui/ProgressiveImage';
import { H5, H7 } from '@ui/typography';
import { withThemeMixin } from '@ui/theme';
import styled from '@ui/styled';

const Container = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.default,
}), 'AlbumView.Container')(View);

const InfoWrapper = styled({
  flexDirection: 'row', alignItems: 'stretch',
}, 'AlbumView.InfoWrapper')(PaddedView);

const AlbumArt = styled({
  position: 'relative',
  width: '33%',
  aspectRatio: 1,
  ...Platform.select({
    web: {
      height: 0,
      paddingTop: '100%',
    },
  }),
}, 'AlbumView.AlbumArt')(ProgressiveImage);

const BlurredImage = styled(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  opacity: theme.alpha.low,
}), 'AlbumView.BlurredImage')(ProgressiveImage);

const TitleWrapper = styled({
  width: '66%',
  justifyContent: 'space-around',
}, 'AlbumView.TitleWrapper')(PaddedView);

const Title = styled({
  backgroundColor: 'transparent',
  flexWrap: 'wrap',
}, 'AlbumView.Title')(H5);

const Artist = styled({
  backgroundColor: 'transparent',
  flexWrap: 'wrap',
}, 'AlbumView.Artist')(H7);

const enhance = compose(
  withThemeMixin({ type: 'dark' }),
  pure,
  setPropTypes({
    title: PropTypes.string,
    artist: PropTypes.string,
    blurredImage: ProgressiveImage.propTypes.source,
    albumImage: ProgressiveImage.propTypes.source,
    isLoading: PropTypes.bool,
  }),
);

const AlbumView = enhance(({
  title, artist, blurredImage, albumImage, isLoading = false,
}) => (
  <Container>
    {(blurredImage) ? <BlurredImage source={blurredImage} /> : null}
    <InfoWrapper>
      <AlbumArt isLoading={isLoading} source={albumImage} />
      <TitleWrapper>
        <Title>{title}</Title>
        <Artist>{artist}</Artist>
      </TitleWrapper>
    </InfoWrapper>
  </Container>
));

export default AlbumView;
