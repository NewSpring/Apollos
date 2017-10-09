import React from 'react';
import renderer from 'react-test-renderer';
import App from './index';

it('renders correctly', () => {
  const tree = renderer.create(
    <App />,
  );
  expect(tree).toMatchSnapshot();
});
