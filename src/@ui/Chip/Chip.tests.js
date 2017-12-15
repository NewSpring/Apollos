import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';

import Chip from './';

describe('The Chip component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Chip title="My Button!" onPress={() => {}} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render an icon', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Chip icon="like" title="Heart!!!" />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should be selected', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Chip title="My Button!" selected />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
