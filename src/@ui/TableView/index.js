import { StyleSheet, View } from 'react-native';
import { compose, renderComponent } from 'recompose';
import styled from '@ui/styled';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import Card from '@ui/Card';

export { default as Cell } from './Cell';
export { default as CellText } from './CellText';
export { default as CellIcon } from './CellIcon';
export { default as Divider } from './Divider';
export { default as FormFields } from './FormFields';

const TableView = compose(
  styled(({ theme }) => ({
    marginBottom: theme.sizing.baseUnit,
    backgroundColor: theme.colors.background.paper,
    borderColor: theme.colors.shadows.default,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  }), 'TableView'),
  mediaQuery(({ md }) => ({ minWidth: md }), renderComponent(Card)),
)(View);

export default TableView;
