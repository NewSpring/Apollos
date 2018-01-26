import { StyleSheet, View } from 'react-native';
import { compose } from 'recompose';
import styled from '@ui/styled';
import { enhancer as mediaQuery } from '@ui/MediaQuery';

export { default as Cell } from './Cell';
export { default as CellText } from './CellText';
export { default as CellIcon } from './CellIcon';
export { default as Divider } from './Divider';

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
  mediaQuery(({ md }) => ({ minWidth: md }), styled(({ theme }) => ({
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    margin: theme.sizing.baseUnit / 2,
  }))),
)(View);

export default TableView;
