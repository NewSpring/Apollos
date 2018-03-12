import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import MiniControls from './MiniControls';

describe('The MiniControls component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <MiniControls
          isPlaying
          play={() => {}}
          pause={() => {}}
          trackName={'My track'}
          trackByLine={'My Byline'}
          albumArt={{
            uri: 'https://placeholdit.co/i/150x150?bg=eeeeee&fc=577084',
            width: 150,
            height: 150,
          }}
          height={50}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
