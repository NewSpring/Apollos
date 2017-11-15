import { StyleSheet } from 'react-native';
import { compose, mapProps, withProps } from 'recompose';
import { omit } from 'lodash';
import { enhancer as mediaQuery } from '@primitives/MediaQuery';
import styled from '@primitives/styled';
import withTheme from '@primitives/withTheme';
import SafeAreaView from '@primitives/SafeAreaView';

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

export default compose(
  withTheme(({ theme: { darkPrimaryColor } = {} }) => ({ darkPrimaryColor })),
  styled(({ darkPrimaryColor }) => ({ backgroundColor: darkPrimaryColor })),
  mediaQuery(({ md }) => ({ maxWidth: md }), styled(styles.horizontal), styled(styles.vertical)),
  mapProps(props => omit(props, ['darkPrimaryColor'])),
)(SafeAreaView);
