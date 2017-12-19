import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import ContentView, { ByLine, Title, HTMLView } from './';

describe('the ContentView component', () => {
  it('renders', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <ContentView>
          <Title>The great escape</Title>
          <ByLine authors={['Mike Douglas']} />
          <HTMLView>{'<p>Yo yo</p><p>this is some cool html</p>'}</HTMLView>
        </ContentView>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
