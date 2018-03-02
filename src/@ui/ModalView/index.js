import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import FlexedView from '@ui/FlexedView';
import SecondaryNav from '@ui/SecondaryNav';
import { nest } from 'recompose';

import ModalContainer from './ModalContainer';

const ModalView = ({
  children, onBackPress, backTo, onBackReplace,
}) => (
  <FlexedView
    style={StyleSheet.absoluteFill}
    forceInset={{ vertical: 'always', horizontal: 'always' }}
  >
    <ModalContainer>
      {React.Children.map(children, child => React.cloneElement(child, { isModal: true }))}
      <SecondaryNav
        backButton
        backButtonIcon="close"
        onBackPress={onBackPress}
        backTo={backTo}
        onBackReplace={onBackReplace}
      />
    </ModalContainer>
  </FlexedView>
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
