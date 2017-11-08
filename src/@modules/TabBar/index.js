import { StyleSheet, View } from 'react-native';
import { compose } from 'recompose';
import { branch as responsiveBranch } from '../../@primitives/MediaQuery';
import styled from '../../@primitives/styled';

export { default as Link } from './Link';
export { default as Layout } from './Layout';

const styles = StyleSheet.create({
  common: {
    backgroundColor: 'gray',
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  vertical: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default compose(
  styled(styles.common),
  responsiveBranch({ max: 'md' }, styled(styles.vertical), styled(styles.horizontal)),
)(View);
