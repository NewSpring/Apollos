import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';
import CardTile from './';

describe('the Card component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render children', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile>
          <Text>Boom!</Text>
        </CardTile>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmonColored = {
      backgroundColor: 'salmon',
    };

    const tree = renderer.create(
      <ThemeProvider>
        <CardTile style={salmonColored} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile accessible={false} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
