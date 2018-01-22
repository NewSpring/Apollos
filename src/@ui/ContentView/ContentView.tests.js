import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '@ui/TestProviders';
import ContentView, { ByLine, Title, HTMLView } from './';

describe('the ContentView component', () => {
  it('renders', () => {
    const tree = renderer.create(
      <Providers>
        <ContentView>
          <Title>The great escape</Title>
          <ByLine authors={['Mike Douglas']} />
          <HTMLView>{'<p>Yo yo</p><p>this is some cool html</p>'}</HTMLView>
        </ContentView>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders with images', () => {
    const images = [
      {
        uri: 'https://picsum.photos/600/400/?random',
        width: 600,
        height: 400,
      },
      {
        uri: 'https://picsum.photos/600/400/?random',
        width: 600,
        height: 400,
      },
    ];

    const tree = renderer.create(
      <Providers>
        <ContentView images={images} imageOverlayColor={'salmon'}>
          <Title>The great escape</Title>
          <ByLine authors={['Mike Douglas']} />
          <HTMLView>{'<p>Yo yo</p><p>this is some cool html</p>'}</HTMLView>
        </ContentView>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders with video', () => {
    const videoSource = {
      video: {
        embedUrl: 'https://player.ooyala.com/static/v4/production/latest/skin-plugin/iframe.html?ec=h2anlxYzE6G8splCI1Fi-VQciOUJ-fl8&pbid=ZmJmNTVlNDk1NjcwYTVkMzAzODkyMjg0&pcode=&pcode=E1dWM6UGncxhent7MRATc3hmkzUD&skin.config=https%3A%2F%2Fdl.dropbox.com%2Fs%2Fsodcv1d9a4ezwm4%2Fskin.new.json%3Fdl%3D1',
      },
    };

    const tree = renderer.create(
      <Providers>
        <ContentView video={videoSource}>
          <Title>The great escape</Title>
          <ByLine authors={['Mike Douglas']} />
          <HTMLView>{'<p>Yo yo</p><p>this is some cool html</p>'}</HTMLView>
        </ContentView>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
