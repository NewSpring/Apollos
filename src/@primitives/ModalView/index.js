import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import SafeAreaView from '@primitives/SafeAreaView';
import SecondaryNav from '@modules/SecondaryNav';
import { nest } from 'recompose';

import ModalContainer from './ModalContainer';

const ModalView = ({ children }) => (
  <SafeAreaView style={StyleSheet.absoluteFill} forceInset={{ vertical: 'always', horizontal: 'always' }}>
    <ModalContainer>
      {children}
      <SecondaryNav />
    </ModalContainer>
  </SafeAreaView>
);

ModalView.propTypes = {
  children: PropTypes.node,
};

// quick n' dirty asModal hoc
export const asModal = child => nest(ModalView, child);

export default ModalView;
