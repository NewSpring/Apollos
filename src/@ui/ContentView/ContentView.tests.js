import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import ContentView from './';

describe('the ContentView component', () => {
  it('renders', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <ContentView
          authors={['Mike Douglas']}
          title={'The great escape'}
          body={'<p>Yo yo</p><p>this is some cool html</p>'}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
