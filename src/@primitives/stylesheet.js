import { StyleSheet } from 'react-native';
import { compose, onlyUpdateForKeys } from 'recompose';
import withTheme from '@primitives/withTheme';

const styleSheetRegistry = [];

const createStyleSheet = (getter) => {
  const reference = {
    getter,
    value: null,
  };
  styleSheetRegistry.push(reference);
  return () => reference.value;
};

export const StyleSheetsProvider = compose(
  withTheme(),
  onlyUpdateForKeys(['theme', 'children']),
)(({ children, theme }) => {
  styleSheetRegistry.forEach((reference) => {
    reference.value = StyleSheet.create(reference.getter(theme));
  });
  return children || null;
});

export default createStyleSheet;
