import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '@primitives/ThemeProvider';
import { Router } from '../NativeWebRouter';
import Component, { Link } from './';

const Providers = ({ children }) => ( // eslint-disable-line
  <ThemeProvider>
    <Router>
      {children}
    </Router>
  </ThemeProvider>
);

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
