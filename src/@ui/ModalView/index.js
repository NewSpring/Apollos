import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet } from 'react-native';
import SecondaryNav from '@ui/SecondaryNav';
import { nest } from 'recompose';

import ModalContainer from './ModalContainer';

const ModalView = ({ children }) => (
  <SafeAreaView style={StyleSheet.absoluteFill} forceInset={{ vertical: 'always', horizontal: 'always' }}>
    <ModalContainer>
      {children}
      <SecondaryNav backButton />
    </ModalContainer>
  </SafeAreaView>
);

ModalView.propTypes = {
  children: PropTypes.node,
};

// quick n' dirty asModal hoc
export const asModal = child => nest(ModalView, child);

export default ModalView;
