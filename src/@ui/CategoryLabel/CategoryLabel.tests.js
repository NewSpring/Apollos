import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import Providers from '@ui/TestProviders';
import CategoryLabel from './';

describe('the FeedItemCard CategoryLabel component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <CategoryLabel label={'Default'} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as a Series', () => {
    const tree = renderer.create(
      <Providers>
        <CategoryLabel label={'Series'} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as Albums', () => {
    const tree = renderer.create(
      <Providers>
        <CategoryLabel label={'Albums'} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom icon', () => {
    const tree = renderer.create(
      <Providers>
        <CategoryLabel
          label={'Default'}
          icon={'like'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a skeleton view', () => {
    const tree = renderer.create(
      <Providers>
        <CategoryLabel
          label={'Default'}
          isLoading
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render children', () => {
    const tree = renderer.create(
      <Providers>
        <CategoryLabel
          label={'Default'}
        >
          <Text>Boom</Text>
        </CategoryLabel>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
