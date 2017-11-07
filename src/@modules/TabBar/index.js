import { StyleSheet, View } from 'react-native';
import { withProps } from 'recompose';
import { renderOnLargerScreens } from '../../@primitives/MediaQuery';

export { default as Link } from './TabBarLink';

const styles = StyleSheet.create({
  common: {
    backgroundColor: 'gray',
  },
  largeScreens: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  smallScreens: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const ForLargeScreens = withProps({ style: [styles.common, styles.largeScreens] })(View);
const ForSmallScreens = withProps({ style: [styles.common, styles.smallScreens] })(View);

export default renderOnLargerScreens(ForLargeScreens)(ForSmallScreens);
