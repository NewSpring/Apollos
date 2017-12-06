import React from 'react';
import renderer from 'react-test-renderer';
import { Router } from '@ui/NativeWebRouter';
import { ThemeProvider } from '@ui/theme';
import Component from './Link';

describe('TabBar Link', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Router>
          <Component />
        </Router>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders with basic props', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Router>
          <Component
            icon="arrow-back"
            label="my label"
            to="/my-link"
            color="red"
          />
        </Router>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
