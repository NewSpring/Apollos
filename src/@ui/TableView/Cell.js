import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from '@ui/styled';

const asFirstChild = child => cloneElement(child, {
  style: { paddingLeft: 0 },
});

const Container = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit / 2,
  paddingLeft: theme.sizing.baseUnit / 1.5,
  backgroundColor: theme.colors.background.paper,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: theme.sizing.baseUnit * 2.5,
}), 'TableView.Cell.Container')(View);

const Cell = ({ children, ...otherProps }) => (
  <Container {...otherProps}>
    {Children.map(children, (child, i) => {
      if (i === 0) return asFirstChild(child);
      return child;
    })}
  </Container>
);

Cell.propTypes = {
  children: PropTypes.node,
};

export default Cell;
