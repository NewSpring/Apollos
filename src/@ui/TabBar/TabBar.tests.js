import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import Component from './';

it('renders correctly', () => {
  const tree = renderer.create(
    <Providers><Component /></Providers>,
  );
  expect(tree).toMatchSnapshot();
});
