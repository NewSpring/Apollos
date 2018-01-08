import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import { View, Platform, StyleSheet } from 'react-native';
import PaddedView from '@ui/PaddedView';
import ConnectedImage from '@ui/ConnectedImage';
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
  width: '33%',
  aspectRatio: 1,
  ...Platform.select({
    web: {
      height: 0,
      paddingTop: '100%',
    },
  }),
}, 'AlbumView.AlbumArt')(ConnectedImage);

const BlurredImage = styled(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  opacity: theme.alpha.low,
}), 'AlbumView.BlurredImage')(ConnectedImage);

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
    blurredImage: ConnectedImage.propTypes.source,
    albumImage: ConnectedImage.propTypes.source,
    isLoading: PropTypes.bool,
  }),
);

const AlbumView = enhance(({
  title, artist, blurredImage, albumImage, isLoading = false,
}) => (
  <Container>
    <BlurredImage source={blurredImage} />
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
