import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import BackgroundView from '@ui/BackgroundView';
import SecondaryNav from '@ui/SecondaryNav';
import { nest } from 'recompose';

import ModalContainer from './ModalContainer';

const ModalView = ({
  children, onBackPress, backTo, onBackReplace,
}) => (
  <BackgroundView style={StyleSheet.absoluteFill} forceInset={{ vertical: 'always', horizontal: 'always' }}>
    <ModalContainer>
      {children}
      <SecondaryNav backButton backButtonIcon="close" onBackPress={onBackPress} backTo={backTo} onBackReplace={onBackReplace} />
    </ModalContainer>
  </BackgroundView>
);

ModalView.propTypes = {
  children: PropTypes.node,
  onBackPress: PropTypes.func,
  backTo: PropTypes.string,
  onBackReplace: PropTypes.bool,
};

// quick n' dirty asModal hoc
export const asModal = child => nest(ModalView, child);

export default ModalView;
