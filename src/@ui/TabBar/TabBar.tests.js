import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';
import Component from './';

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider><Component /></ThemeProvider>,
  );
  expect(tree).toMatchSnapshot();
});
