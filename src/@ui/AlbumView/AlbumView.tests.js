import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import AlbumView from './';

describe('The AlbumView component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
