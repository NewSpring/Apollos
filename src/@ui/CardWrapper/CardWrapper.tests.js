import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import CardWrapper from './';

describe('the Card component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <CardWrapper />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render children', () => {
    const tree = renderer.create(
      <Providers>
        <CardWrapper>
          <Text>Boom!</Text>
        </CardWrapper>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept a backgroundColor', () => {
    const tree = renderer.create(
      <Providers>
        <CardWrapper backgroundColor={'salmon'}>
          <Text>Boom!</Text>
        </CardWrapper>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const cardDimensions = {
      height: 400,
      width: '92%',
    };

    const tree = renderer.create(
      <Providers>
        <CardWrapper style={cardDimensions} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <Providers>
        <CardWrapper accessible={false} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
