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
});
