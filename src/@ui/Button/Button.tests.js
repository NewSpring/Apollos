import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import { View } from 'react-native';

import Button from './';

describe('The Button component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Button title="My Button!" onPress={() => {}} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with children', () => {
    const tree = renderer.create(
      <Providers>
        <Button>
          <View />
        </Button>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a primary button', () => {
    const tree = renderer.create(
      <Providers>
        <Button title="My Button!" type="primary" />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a disabled button', () => {
    const tree = renderer.create(
      <Providers>
        <Button title="My Button!" disabled />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
