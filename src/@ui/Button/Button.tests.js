import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';
import { View } from 'react-native';

import Button from './';

describe('The Button component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Button title="My Button!" onPress={() => {}} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with children', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Button>
          <View />
        </Button>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a primary button', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Button title="My Button!" type="primary" />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a disabled button', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Button title="My Button!" disabled />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
