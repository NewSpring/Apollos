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
  styled(({ theme: { screenLight } = {} }) => ({
    flex: 1,
    backgroundColor: screenLight,
  })),
  mediaQuery(({ md }) => ({ maxWidth: md }),
    styled(styles.mobile),
    styled(styles.horizontalLayout),
  ),
)(View);

export default Layout;
