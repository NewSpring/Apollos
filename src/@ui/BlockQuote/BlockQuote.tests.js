import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '@ui/TestProviders';
import BlockQuote from './';

describe('the BulletListItem component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <BlockQuote>
          “You are the only Bible some unbelievers will ever read.” – John MacArthur
        </BlockQuote>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
