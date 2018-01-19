import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import SafeAreaView from '@ui/SafeAreaView';
import SecondaryNav from '@ui/SecondaryNav';
import { nest } from 'recompose';

import ModalContainer from './ModalContainer';

const ModalView = ({ children, onBackPress }) => (
  <SafeAreaView style={StyleSheet.absoluteFill} forceInset={{ vertical: 'always', horizontal: 'always' }}>
    <ModalContainer>
      {children}
      <SecondaryNav backButton backButtonIcon="close" onBackPress={onBackPress} />
    </ModalContainer>
  </SafeAreaView>
);

ModalView.propTypes = {
  children: PropTypes.node,
  onBackPress: PropTypes.func,
};

// quick n' dirty asModal hoc
export const asModal = child => nest(ModalView, child);

export default ModalView;
