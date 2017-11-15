import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '@primitives/ThemeProvider';

import Header from './';

describe('The Header component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
