import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import Component, { Link } from './';

describe('SecondaryNav Component', () => {
  it('renders correctly with default props', () => {
    const tree = renderer.create(
      <Providers><Component /></Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders with custom links', () => {
    const tree = renderer.create(
      <Providers>
        <Component>
          <Link icon="building" label="Building" />
          <Link icon="bank" label="Bank" />
        </Component>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with custom links and no back button', () => {
    const tree = renderer.create(
      <Providers>
        <Component backButton={false}>
          <Link icon="building" label="Building" />
          <Link icon="bank" label="Bank" />
        </Component>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
