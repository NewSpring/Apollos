import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import H2 from './';

describe('the H2 component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <H2>Default H2 text</H2>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <Providers>
        <H2 style={salmon}>Salmon text</H2>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <Providers>
        <H2 accessible={false}>{'"God is most glorified in us when we are most satisfied in Him" ― John Piper'}</H2>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
