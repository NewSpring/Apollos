import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import CategoryLabel from './';

describe('the FeedItemCard CategoryLabel component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CategoryLabel label={'Default'} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as a Series', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CategoryLabel label={'Series'} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as Albums', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CategoryLabel label={'Albums'} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom icon', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CategoryLabel
          label={'Default'}
          icon={'like'}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a skeleton view', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CategoryLabel
          label={'Default'}
          isLoading
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render children', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CategoryLabel
          label={'Default'}
        >
          <Text>Boom</Text>
        </CategoryLabel>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
