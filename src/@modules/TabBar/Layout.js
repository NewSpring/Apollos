import { StyleSheet, View } from 'react-native';
import { compose } from 'recompose';
import { branch as responsiveBranch } from '@primitives/MediaQuery';
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

export default compose(
  styled(styles.common),
  responsiveBranch({ max: 'md' }, styled(styles.mobile), styled(styles.horizontalLayout)),
)(View);
