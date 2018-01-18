import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import SideBySide, { ResponsiveSideBySideView } from './';

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

describe('The ResponsiveSideBySideView component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ResponsiveSideBySideView>
        <View />
        <View />
      </ResponsiveSideBySideView>,
    );
    expect(tree).toMatchSnapshot();
  });
});
