import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '@ui/ThemeProvider';
import H4 from './';

describe('the H4 component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <H4>Default H4 text</H4>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <ThemeProvider>
        <H4 style={salmon}>Salmon text</H4>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <H4 accessible={false}>{'"What you are is God\'s gift to you, what you become is your gift to God." ― Hans Urs von Balthasar'}</H4>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
