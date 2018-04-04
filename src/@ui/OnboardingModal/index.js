import React from 'react';
import { AsyncStorage, Modal } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import Onboarding from '../Onboarding';

const enhance = compose(pure, setPropTypes({}));

const showModal = async () => {
  // Read from AsyncStorage (https://facebook.github.io/react-native/docs/asyncstorage.html).
  // If there is a value in there for this user then do not show the modal.
  try {
    const value = await AsyncStorage.getItem('onboarded');
    if (value === null) {
      // There is no value in AsyncStorage for this. Show the onboarding modal.
      return true;
    }
  } catch (error) {
    // Error retrieving data
    console.log("Couldn't pull onboarding data from AsyncStorage", error);
  }
  return false;
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
