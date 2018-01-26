import React from 'react';
import renderer from 'react-test-renderer';
import { Animated } from 'react-native';
import Providers from '@ui/TestProviders';

import Seeker from './';

describe('The Seeker component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <Seeker
          progress={new Animated.Value(0)}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
