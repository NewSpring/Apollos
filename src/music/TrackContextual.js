import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes, withProps, defaultProps } from 'recompose';
import { withPlaylist } from '@data/mediaPlayer';
import { withThemeMixin } from '@ui/theme';
import AlbumView from '@ui/AlbumView';
import FlexedRootView from '@ui/FlexedRootView';
import PaddedView from '@ui/PaddedView';
import { getAlbumImageSource } from '@utils/content';
import { asModal } from '@ui/ModalView';
import { H5 } from '@ui/typography';
import { Link } from '@ui/NativeWebRouter';
import Touchable from '@ui/Touchable';
import styled from '@ui/styled';

const Container = styled({
  justifyContent: 'flex-end',
})(FlexedRootView);

const enhance = compose(
  withProps(({ match: { params: { id, track } } }) => ({ id, track })),
  setPropTypes({
    id: PropTypes.string, // album id
    track: PropTypes.string, // track title
    albumPath: PropTypes.func,
  }),
  defaultProps({
    pathForAlbumId: id => `/music/${id}`,
  }),
  withPlaylist,
  withThemeMixin({ type: 'dark' }),
  asModal,
);

const TrackContextual = enhance(({
  id,
  pathForAlbumId,
  track,
  content: {
    title,
    content: {
      images = [],
    } = {},
  } = {},
}) => (
  <Container>
    <AlbumView
      title={track}
      artist={`${title} - NewsSpring`}
      albumImage={getAlbumImageSource(images)}
    />
    <PaddedView>
      <Link to={pathForAlbumId(id)}><H5>View Album</H5></Link>
    </PaddedView>
    <PaddedView>
      <Touchable><H5>Share</H5></Touchable>
    </PaddedView>
  </Container>
));

export default TrackContextual;
