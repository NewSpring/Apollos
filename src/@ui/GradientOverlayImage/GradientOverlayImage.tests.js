import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '@ui/TestProviders';
import GradientOverlayImage from './';

describe('the GradientOverlayImage component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <GradientOverlayImage source={[{
            uri: 'https://picsum.photos/600/400/?random',
            width: 600,
            height: 400,
          }]}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with an overlayColor', () => {
    const tree = renderer.create(
      <Providers>
        <GradientOverlayImage
          source={[{
            uri: 'https://picsum.photos/600/400/?random',
            width: 600,
            height: 400,
          }]}
          overlayColor={'salmon'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
