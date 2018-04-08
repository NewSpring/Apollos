import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import MiniControlsThumbnail from './';

describe('The MiniControls component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <MiniControlsThumbnail source={'https://picsum.photos/600/400/?random'} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
