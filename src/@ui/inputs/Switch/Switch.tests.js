import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';

import Switch from './';

describe('The Picker Input component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Switch label="Some label text" />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
