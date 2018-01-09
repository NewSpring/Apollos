import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import { Line } from './Line';

describe('The Line placeholder', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers><Line /></Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('accepts width', () => {
    const tree = renderer.create(
      <Providers><Line width="50%" /></Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('accepts custom styles', () => {
    const tree = renderer.create(
      <Providers><Line width="50%" style={{ backgroundColor: 'salmon' }} /></Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
