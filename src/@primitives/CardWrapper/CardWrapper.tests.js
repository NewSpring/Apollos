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
  it('should accept and render passed in styles', () => {
    const cardDimensions = {
      height: 400,
      width: '92%',
    };

    const tree = renderer.create(
      <ThemeProvider>
        <Card style={cardDimensions} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Card accessible={false} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
