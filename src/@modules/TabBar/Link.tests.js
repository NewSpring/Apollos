import React from 'react';
import renderer from 'react-test-renderer';
import { Router } from '@modules/NativeWebRouter';
import Component from './Link';

describe('TabBar Link', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Router>
        <Component />
      </Router>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders with basic props', () => {
    const tree = renderer.create(
      <Router>
        <Component
          icon="arrow-back"
          label="my label"
          to="/my-link"
          color="red"
        />
      </Router>,
    );
    expect(tree).toMatchSnapshot();
  });
});
