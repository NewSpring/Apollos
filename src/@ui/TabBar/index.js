import { SafeAreaView, StyleSheet } from 'react-native';
import { compose } from 'recompose';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import styled from '@ui/styled';

export { default as Link } from './Link';
export { default as Layout } from './Layout';

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 80, // todo: need to inherit from base unit?
    paddingTop: 10,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
});

const TabBar = compose(
  styled(({ theme }) => ({
    backgroundColor: theme.colors.darkPrimary,
  }), 'TabBar'),
  mediaQuery(({ md }) => ({ maxWidth: md }),
    styled(styles.horizontal, 'TabBar@narrow'),
    styled(styles.vertical, 'TabBar@wide'),
  ),
)(SafeAreaView);

export default TabBar;
