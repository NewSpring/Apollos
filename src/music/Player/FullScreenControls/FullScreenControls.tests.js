import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import FullScreenControls from './FullScreenControls';

describe('The FullScreenControls component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <FullScreenControls
          isPlaying
          duration={'5:30'}
          play={() => {}}
          pause={() => {}}
          next={() => {}}
          prev={() => {}}
          trackName={'My track'}
          trackByLine={'My Byline'}
          albumArt={{
            uri: 'https://placeholdit.co/i/150x150?bg=eeeeee&fc=577084',
            width: 150,
            height: 150,
          }}
          color={'red'}
          isShuffling
          isRepeating
          handleShuffle={() => {}}
          handleRepeat={() => {}}
          trackInfoLink={'/info'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should hide player settings controls if only playing one track', () => {
    const tree = renderer.create(
      <Providers>
        <FullScreenControls
          isPlaying
          duration={'5:30'}
          play={() => {}}
          pause={() => {}}
          next={() => {}}
          prev={() => {}}
          trackName={'My track'}
          trackByLine={'My Byline'}
          albumArt={{
            uri: 'https://placeholdit.co/i/150x150?bg=eeeeee&fc=577084',
            width: 150,
            height: 150,
          }}
          color={'red'}
          isShuffling
          isRepeating
          handleShuffle={() => {}}
          handleRepeat={() => {}}
          trackInfoLink={'/info'}
          playlist={{ tracks: [] }}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
