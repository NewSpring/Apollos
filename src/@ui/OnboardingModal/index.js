import React from 'react';
import { AsyncStorage, Modal } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import Onboarding from '../Onboarding';

const enhance = compose(pure, setPropTypes({}));

const showModal = async () => {
  try {
    // Read from AsyncStorage (https://facebook.github.io/react-native/docs/asyncstorage.html).
    const value = await AsyncStorage.getItem('onboarded');
    if (value === null) {
      // There is no value in AsyncStorage for this. Show the onboarding modal.
      return true;
    }
  } catch (error) {
    // Error retrieving data
    console.log("Couldn't read the onboarding data from AsyncStorage", error);
  }
  return false;
};

const closeModal = async () => {
  // Write the value to AsyncStorage and close the modal.
  try {
    await AsyncStorage.setItem('onboarded', true);
  } catch (error) {
    // Error saving data
    console.log("Couldn't save the onboarded data to AsyncStorage", error);
  }
  showModal();
};

const OnboardingModal = enhance(() => (
  <Modal visible={showModal} onDismiss={closeModal} animationType="slide">
    <Onboarding closeModal={closeModal} />
  </Modal>
));

export default OnboardingModal;
