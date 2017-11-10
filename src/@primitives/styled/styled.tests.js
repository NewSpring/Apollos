import React from 'react';
import renderer from 'react-test-renderer';
import { compose } from 'recompose';
import { View } from 'react-native';
import styled from './';

describe('the styled HOC', () => {
  it('passes style literal to the base component', () => {
    const StyledView = styled({ backgroundColor: 'red' })(View);
    const tree = renderer.create(
      <StyledView />,
    );
    expect(tree).toMatchSnapshot();
  });
  it('supports multiple styles', () => {
    const StyledView = compose(
      styled({ backgroundColor: 'red' }),
      styled({ borderColor: 'green' }),
    )(View);
    const tree = renderer.create(
      <StyledView style={{ height: 100 }} />,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept a function', () => {
    const StyledView = styled(({ color }) => ({ backgroundColor: color }))(View);
    const tree = renderer.create(
      <StyledView color="green" />,
    );
    expect(tree).toMatchSnapshot();
  });
});
