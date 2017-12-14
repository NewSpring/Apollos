import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';
import CardWrapper from './';

describe('the Card component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardWrapper />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render children', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardWrapper>
          <Text>Boom!</Text>
        </CardWrapper>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept a backgroundColor', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardWrapper backgroundColor={'salmon'}>
          <Text>Boom!</Text>
        </CardWrapper>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const cardDimensions = {
      height: 400,
      width: '92%',
    };

    const tree = renderer.create(
      <ThemeProvider>
        <CardWrapper style={cardDimensions} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardWrapper accessible={false} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
