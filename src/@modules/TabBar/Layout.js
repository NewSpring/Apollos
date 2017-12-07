import { StyleSheet, View } from 'react-native';
import { compose } from 'recompose';
import { enhancer as mediaQuery } from '@primitives/MediaQuery';
import styled from '@primitives/styled';

const styles = StyleSheet.create({
  mobile: {
    flexDirection: 'column',
  },
  horizontalLayout: {
    flexDirection: 'row-reverse',
  },
});

const Layout = compose(
  styled(({ theme: { screenLightColor } = {} }) => ({
    flex: 1,
    backgroundColor: screenLightColor,
  })),
  mediaQuery(({ md }) => ({ maxWidth: md }),
    styled(styles.mobile),
    styled(styles.horizontalLayout),
  ),
)(View);

export default Layout;
