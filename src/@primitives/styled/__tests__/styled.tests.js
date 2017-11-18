import React from 'react';
import renderer from 'react-test-renderer';
import { compose } from 'recompose';
import { View } from 'react-native';
import ThemeProvider from '@primitives/ThemeProvider';
import styled from '../';

describe('the styled HOC', () => {
  it('passes style literal to the base component', () => {
    const StyledView = styled({ backgroundColor: 'red' })(View);
    const tree = renderer.create(
      <StyledView />,
    );
    expect(tree).toMatchSnapshot();
  });
  it('supports multiple styles, and keeps the correct order', () => {
    const StyledView = compose(
      styled({ backgroundColor: 'red' }),
      styled({ borderColor: 'green' }),
    )(View);
    const tree = renderer.create(
      <StyledView style={{ height: 100 }} />,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept a function, works with props', () => {
    const StyledView = styled(({ color }) => ({ backgroundColor: color }))(View);
    const tree = renderer.create(
      <StyledView color="green" />,
    );
    expect(tree).toMatchSnapshot();
  });
  it('provides a theme', () => {
    const StyledView = styled(({ theme }) => ({ backgroundColor: theme.primaryColor }))(View);
    const tree = renderer.create(
      <ThemeProvider><StyledView /></ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
