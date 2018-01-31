import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import BodyCopy from './';

describe('the BodyCopy component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <BodyCopy>Default BodyCopy text</BodyCopy>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as bold', () => {
    const tree = renderer.create(
      <Providers>
        <BodyCopy bold>Bold BodyCopy text</BodyCopy>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as italic', () => {
    const tree = renderer.create(
      <Providers>
        <BodyCopy italic>Italic BodyCopy text</BodyCopy>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as bold italic', () => {
    const tree = renderer.create(
      <Providers>
        <BodyCopy bold italic>Bold italic BodyCopy text</BodyCopy>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <Providers>
        <BodyCopy style={salmon}>Salmon text</BodyCopy>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <Providers>
        <BodyCopy accessible={false}>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</BodyCopy>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
