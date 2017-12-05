import { View, StyleSheet } from 'react-native';
import { compose, nest } from 'recompose';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import styled from '@ui/styled';

const narrow = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.screenLight,
  overflow: 'hidden',
}));

const wide = styled(({ theme }) => ({
  flex: 1,
  flexDirection: 'row-reverse',
  maxWidth: theme.breakpoints.sm,
  backgroundColor: theme.screenLight,
  overflow: 'hidden',
}));

const BackgroundOverlay = styled(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: theme.darkOverlayColor,
}))(View);

const ModalContainer = compose(
  mediaQuery(({ md }) => ({ minWidth: md }), modal => nest(BackgroundOverlay, modal)),
  mediaQuery(({ md }) => ({ maxWidth: md }), narrow, wide),
)(View);

export default ModalContainer;
