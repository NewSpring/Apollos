import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import P from './';

describe('the P component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <P>Default P text</P>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <Providers>
        <P style={salmon}>Salmon text</P>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <Providers>
        <P accessible={false}>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</P>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
