import { StyleSheet } from 'react-native';
import { compose } from 'recompose';
import Color from 'color';

import { withThemeMixin } from '@ui/theme';
import styled from '@ui/styled';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import SafeAreaView from '@ui/SafeAreaView';

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
  withThemeMixin({
    type: 'dark',
  }),
  styled(({ theme }) => ({
    // todo - this color was hardcoded in Holtzman and has no corresponding theme value
    backgroundColor: Color(theme.colors.background.default).darken(0.325).hex(),
  }), 'TabBar'),
  mediaQuery(({ md }) => ({ maxWidth: md }),
    styled(styles.horizontal, 'TabBar@narrow'),
    styled(styles.vertical, 'TabBar@wide'),
  ),
)(SafeAreaView);

export default TabBar;
