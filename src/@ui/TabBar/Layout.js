import { StyleSheet, View } from 'react-native';
import { compose } from 'recompose';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import styled from '@ui/styled';

const styles = StyleSheet.create({
  mobile: {
    flexDirection: 'column',
  },
  horizontalLayout: {
    flexDirection: 'row-reverse',
  },
});

const Layout = compose(
  styled(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.palette.background.default,
  }), 'TabBar.Layout'),
  mediaQuery(({ md }) => ({ maxWidth: md }),
    styled(styles.mobile, 'TabBar@narrow'),
    styled(styles.horizontalLayout, 'TabBar@wide'),
  ),
)(View);

export default Layout;
