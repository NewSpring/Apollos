import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import SideBySide from './';

describe('The SideBySide component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <SideBySide>
        <View />
        <View />
      </SideBySide>,
    );
    expect(tree).toMatchSnapshot();
  });
});
