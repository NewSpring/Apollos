import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import BodyText from './';

describe('the BodyText component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <BodyText>Default BodyText text</BodyText>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as bold', () => {
    const tree = renderer.create(
      <Providers>
        <BodyText bold>Bold BodyText text</BodyText>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as italic', () => {
    const tree = renderer.create(
      <Providers>
        <BodyText italic>Italic BodyText text</BodyText>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as bold italic', () => {
    const tree = renderer.create(
      <Providers>
        <BodyText bold italic>Bold italic BodyText text</BodyText>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <Providers>
        <BodyText style={salmon}>Salmon text</BodyText>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <Providers>
        <BodyText accessible={false}>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</BodyText>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
