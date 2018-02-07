import { ActivityIndicator as NativeActivityIndicator, StyleSheet } from 'react-native';
import { compose } from 'recompose';
import styled from '@ui/styled';

const ActivityIndicator = compose(
  styled({
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
  }, 'ActivityIndicator'),
)(NativeActivityIndicator);

export const InlineActivityIndicator = NativeActivityIndicator;

export default ActivityIndicator;
