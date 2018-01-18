import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import Component from './Link';

describe('TabBar Link', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Component />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders with basic props', () => {
    const tree = renderer.create(
      <Providers>
        <Component
          icon="arrow-back"
          label="my label"
          to="/my-link"
          color="red"
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
