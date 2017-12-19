import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';


import SkeletonImage from './SkeletonImage';

describe('the SkeletonImage component', () => {
  it('should render a loading state', () => {
    const tree = renderer.create(
      <SkeletonImage onReady={false} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
