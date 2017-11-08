import { StyleSheet, View } from 'react-native';
import { compose } from 'recompose';
import { branch as responsiveBranch } from '../../@primitives/MediaQuery';
import styled from '../../@primitives/styled';

export { default as Link } from './TabBarLink';

const styles = StyleSheet.create({
  common: {
    backgroundColor: 'gray',
  },
  vertical: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default compose(
  styled(styles.common),
  responsiveBranch({ max: 'md' }, styled(styles.horizontal), styled(styles.vertical)),
)(View);
