import React from 'react';
import renderer from 'react-test-renderer';
import Component from './';

it('renders correctly', () => {
  const tree = renderer.create(
    <Component />,
  );
  expect(tree).toMatchSnapshot();
});
