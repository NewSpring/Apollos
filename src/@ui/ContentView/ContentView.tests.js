import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '@ui/TestProviders';
import ContentView from './';

describe('the ContentView component', () => {
  it('renders', () => {
    const tree = renderer.create(
      <Providers>
        <ContentView
          authors={['Mike Douglas']}
          title={'The great escape'}
          body={'<p>Yo yo</p><p>this is some cool html</p>'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
