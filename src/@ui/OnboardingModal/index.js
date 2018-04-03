import React from 'react';
import { Modal } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import Onboarding from '../Onboarding';

const enhance = compose(pure, setPropTypes({}));

const showModal = () => {
  // Read from AsyncStorage (https://facebook.github.io/react-native/docs/asyncstorage.html).
  // If there is a value in there for this user then do not show the modal.
};

const closeModal = () => {
  // Write the value to AsyncStorage and close the modal.
};

const OnboardingModal = enhance(() => (
  <Modal visible={showModal} onDismiss={closeModal} animationType="slide">
    <Onboarding />
  </Modal>
));

export default OnboardingModal;
