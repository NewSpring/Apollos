import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '@ui/TestProviders';
import CardImage from './';

describe('the FeedItemCard CardImage component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <CardImage source={[{
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
        <CardImage
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
