import React from 'react';
import { StyleSheet } from 'react-native';
import SafeAreaView from '@primitives/SafeAreaView';

import ModalContainer from './ModalContainer';

const ModalView = props => (
  <SafeAreaView style={StyleSheet.absoluteFill} forceInset={{ vertical: 'always', horizontal: 'always' }}>
    <ModalContainer {...props} />
  </SafeAreaView>
);

export default ModalView;
