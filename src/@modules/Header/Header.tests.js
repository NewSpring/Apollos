import React from 'react';
import renderer from 'react-test-renderer';
import Header from './';

describe('The Header component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Header />,
    );
    expect(tree).toMatchSnapshot();
  });
});
