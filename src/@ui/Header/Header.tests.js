import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import Header from './';

describe('The Header component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Header />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a back button correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Header backButton />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
