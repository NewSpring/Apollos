import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import AudioBanner from './';

describe('the AudioBanner component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <AudioBanner />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept a title prop', () => {
    const tree = renderer.create(
      <Providers>
        <AudioBanner titleText={'Listen to Sermon'} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
