import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AlbumView from './';

storiesOf('AlbumView', module)
  .add('basic', () => (
    <AlbumView
      title="Able"
      artist="NewSpring"
      blurredImage={{
        fileLabel: null,
        fileName: 'able.blurred.1x1.jpg',
        fileType: null,
        url: '//drhztd8q3iayu.cloudfront.net/newspring/collection/albums/able.blurred.1x1.large.jpg',
      }}
      albumImage={{
        fileLabel: null,
        fileName: 'able.artwork.1x1.jpg',
        fileType: null,
        url: '//drhztd8q3iayu.cloudfront.net/newspring/collection/albums/able.artwork.1x1.large.jpg',
      }}
    />
  ));
