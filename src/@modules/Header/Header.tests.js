import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '@primitives/ThemeProvider';
import { Router } from '@modules/NativeWebRouter';

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
  it('should render with a back button correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Router>
          <Header backButton />
        </Router>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
