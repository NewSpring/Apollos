import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import TracksList from './';

describe('The TracksList component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <TracksList
          tracks={[
            {
              duration: '0:43',
              file: '//s3.amazonaws.com/ns.downloads/newspring/music/album-downloads/01_Able.mp3',
              title: 'Able',
            },
            {
              duration: '0:46',
              file: '//s3.amazonaws.com/ns.downloads/newspring/music/album-downloads/02_See_Me_Through.mp3',
              title: 'See Me Through',
            },
            {
              duration: '0:52',
              file: '//s3.amazonaws.com/ns.downloads/newspring/music/album-downloads/03_Worthy.mp3',
              title: 'Worthy',
            },
            {
              duration: '0:45',
              file: '//s3.amazonaws.com/ns.downloads/newspring/music/album-downloads/04_Now_And_Forever.mp3',
              title: 'Now and Forever',
            },
            {
              duration: '0:40',
              file: '//s3.amazonaws.com/ns.downloads/newspring/music/album-downloads/05_King_Of_Kings.mp3',
              title: 'King of Kings',
            },
            {
              duration: '0:51',
              file: '//s3.amazonaws.com/ns.downloads/newspring/music/album-downloads/06_God_Of_Heaven.mp3',
              title: 'God of Heaven',
            },
            {
              duration: '0:42',
              file: '//s3.amazonaws.com/ns.downloads/newspring/music/album-downloads/07_Every_Line.mp3',
              title: 'Every Line',
            },
            {
              duration: '0:45',
              file: '//s3.amazonaws.com/ns.downloads/newspring/music/album-downloads/08_Our_Great_God.mp3',
              title: 'Our Great God',
            },
            {
              duration: '0:39',
              file: '//s3.amazonaws.com/ns.downloads/newspring/music/album-downloads/09_For_Your_Glory_And_For_Me.mp3',
              title: 'For Your Glory and For Me',
            },
            {
              duration: '0:43',
              file: '//s3.amazonaws.com/ns.downloads/newspring/music/album-downloads/10_Tis_So_Sweet.mp3',
              title: '\'Tis So Sweet',
            },
          ]}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
