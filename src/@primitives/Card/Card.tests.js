import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '@primitives/ThemeProvider';
import Card from './';

describe('the Card component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Card />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
