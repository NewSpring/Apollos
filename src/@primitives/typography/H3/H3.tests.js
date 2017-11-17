import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '@primitives/ThemeProvider';
import H3 from './';

describe('the H3 component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <H3>Default H3 text</H3>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <ThemeProvider>
        <H3 style={salmon}>Salmon text</H3>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <H3 accessible={false}>{'"The Christian shoemaker does his duty not by putting little crosses on the shoes, but by making good shoes, because God is interested in good craftsmanship." ― Martin Luther'}</H3>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
