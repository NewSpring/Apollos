import React from 'react';
import { View, StyleSheet } from 'react-native';
import SafeAreaView from '@primitives/SafeAreaView';
import styled from '@primitives/styled';

const StyledModalContainer = styled({
  flex: 1,
  borderRadius: 20,
  backgroundColor: 'white', // todo: replace with theme color when styled supports themes
  overflow: 'hidden',
})(View);

const ModalView = props => (
  <SafeAreaView style={StyleSheet.absoluteFill} forceInset={{ vertical: 'always', horizontal: 'always' }}>
    <StyledModalContainer {...props} />
  </SafeAreaView>
);

export default ModalView;
