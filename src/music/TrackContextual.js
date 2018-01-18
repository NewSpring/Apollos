import React from 'react';
import { Modal } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setPropTypes, mapProps } from 'recompose';
import { withPlaylist } from '@data/mediaPlayer';
import { withThemeMixin } from '@ui/theme';
import AlbumView from '@ui/AlbumView';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import { getAlbumImageSource } from '@utils/content';
import { asModal } from '@ui/ModalView';

const enhance = compose(
  mapProps(({ match: { params: { id, track } } }) => ({ id, track })),
  setPropTypes({
    id: PropTypes.string, // album id
    track: PropTypes.string, // track title
    handleViewAlbum: PropTypes.func,
    ...Modal.propTypes,
  }),
  withPlaylist,
  withThemeMixin({ type: 'dark' }),
  asModal,
);

const TrackContextual = enhance(({
  track,
  // handleViewAlbum,
  content: {
    title,
    content: {
      images = [],
    } = {},
  } = {},
}) => (
  <FlexedView>
    <AlbumView
      title={track}
      artist={`${title} - NewsSpring`}
      albumImage={getAlbumImageSource(images)}
    />
    <PaddedView />
  </FlexedView>
));

export default TrackContextual;
