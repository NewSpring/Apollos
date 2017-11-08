import { StyleSheet, View } from 'react-native';
import { compose } from 'recompose';
import { branch as responsiveBranch } from '../../@primitives/MediaQuery';
import styled from '../../@primitives/styled';
import withTheme from '../../@primitives/withTheme';

export { default as Link } from './Link';
export { default as Layout } from './Layout';

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: 80, // todo: need to inherit from base unit?
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default compose(
  withTheme(({ theme: { darkPrimaryColor } = {} }) => ({ darkPrimaryColor })),
  styled(({ darkPrimaryColor }) => ({ backgroundColor: darkPrimaryColor })),
  responsiveBranch({ max: 'md' }, styled(styles.horizontal), styled(styles.vertical)),
)(View);
