import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import H4 from './';

describe('the H4 component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <H4>Default H4 text</H4>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <Providers>
        <H4 style={salmon}>Salmon text</H4>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <Providers>
        <H4 accessible={false}>{'"What you are is God\'s gift to you, what you become is your gift to God." ― Hans Urs von Balthasar'}</H4>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
