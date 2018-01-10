import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import { Typography } from './Typography';

describe('The Typography placeholder', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers><Typography /></Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('translates type styles', () => {
    const tree = renderer.create(
      <Providers><Typography style={{ fontSize: 24, lineHeight: 32 }} /></Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
