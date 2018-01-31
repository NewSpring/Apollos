import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '@ui/TestProviders';
import BulletListItem from './';

describe('the BulletListItem component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <BulletListItem>
          “God’s work done in God’s way will never lack God’s supplies.” – Hudson Taylor
        </BulletListItem>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
