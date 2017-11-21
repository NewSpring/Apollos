import { ActivityIndicator as NativeActivityIndicator, StyleSheet } from 'react-native';
import { compose, mapProps } from 'recompose';
import styled from '@primitives/styled';

const ActivityIndicator = compose(
  mapProps(() => {}),
  styled({
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
  }),
)(NativeActivityIndicator);

export default ActivityIndicator;
