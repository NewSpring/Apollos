import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';

import Picker, { Item } from './';

describe('The Picker Input component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Picker
          placeholder="Select a language..."
          label="Languages"
        >
          <Item label="Java" value="java" />
          <Item label="JavaScript" value="js" />
        </Picker>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
