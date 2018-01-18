import React from 'react';
import { Modal } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { withPlaylist } from '@data/mediaPlayer';
import { withThemeMixin } from '@ui/theme';
import AlbumView from '@ui/AlbumView';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import { getBlurredImageSource, getAlbumImageSource } from '@utils/content';

const enhance = compose(
  setPropTypes({
    id: PropTypes.string, // album id
    track: PropTypes.string, // track title
    handleViewAlbum: PropTypes.func,
    ...Modal.propTypes,
  }),
  withPlaylist,
  withThemeMixin({ type: 'dark' }),
);

const TrackContextual = enhance(({
  track,
  handleViewAlbum,
  content: {
    title,
    content: {
      images = [],
    } = {},
  } = {},
  ...modalProps
}) => (
  <Modal {...modalProps}>
    <FlexedView>
      <PaddedView>
        <AlbumView
          title={title}
          artist="NewSpring"
          albumImage={getAlbumImageSource(images)}
          blurredImage={getBlurredImageSource(images)}
        />
      </PaddedView>
    </FlexedView>
  </Modal>
));

export default TrackContextual;
