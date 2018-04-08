import React from 'react';
import renderer from 'react-test-renderer';

import Onboarding from '../';

describe('Onboarding', () => {
  it('should render', () => {
    const tree = renderer.create(<Onboarding />);
    expect(tree).toMatchSnapshot();
  });
});
