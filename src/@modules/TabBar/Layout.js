import { StyleSheet, View } from 'react-native';
import { compose } from 'recompose';
import { enhancer as mediaQuery } from '@primitives/MediaQuery';
import styled from '@primitives/styled';

const styles = StyleSheet.create({
  common: {
    flex: 1,
  },
  mobile: {
    flexDirection: 'column',
  },
  horizontalLayout: {
    flexDirection: 'row-reverse',
  },
});

const Layout = compose(
  styled(styles.common),
  mediaQuery(({ md }) => ({ maxWidth: md }),
    styled(styles.mobile),
    styled(styles.horizontalLayout),
  ),
)(View);

export default Layout;
