import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '@primitives/ThemeProvider';
import P from './';

describe('the P component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <P>Default P text</P>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <ThemeProvider>
        <P style={salmon}>Salmon text</P>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <P accessible={false}>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</P>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
