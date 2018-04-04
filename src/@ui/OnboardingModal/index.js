import React, { PureComponent } from 'react';
import { AsyncStorage, Modal } from 'react-native';
// import { compose, pure, setPropTypes } from 'recompose';
import Onboarding from '../Onboarding';

// const enhance = compose(pure, setPropTypes({}));

class OnboardingModal extends PureComponent {
  state = {
    showModal: false,
  };

  componentDidMount() {
    this.showModal();
  }

  closeModal = async () => {
    // Write the value to AsyncStorage and close the modal.
    console.log('closeModal');
    try {
      await AsyncStorage.setItem('onboarded', 'flibbertygibbet');
    } catch (error) {
      // Error saving data
      console.log("Couldn't save the onboarded data to AsyncStorage", error);
    }
    console.log('onboarded = ', await AsyncStorage.getItem('onboarded'));
    this.showModal();
  };

  showModal = async () => {
    console.log('showModal');
    try {
      // Read from AsyncStorage (https://facebook.github.io/react-native/docs/asyncstorage.html).
      const value = await AsyncStorage.getItem('onboarded');
      console.log('value = ', value);
      if (value === null) {
        // There is no value in AsyncStorage for this. Show the onboarding modal.
        this.setState({ showModal: true });
        return true;
      }
    } catch (error) {
      // Error retrieving data
      console.log("Couldn't read the onboarding data from AsyncStorage", error);
    }
    // await AsyncStorage.removeItem('onboarded');
    this.setState({ showModal: false });
    return false;
  };

  render() {
    return (
      <Modal visible={this.state.showModal} onDismiss={this.closeModal} animationType="slide">
        <Onboarding closeModal={this.closeModal} />
      </Modal>
    );
  }
}

// const OnboardingModal = enhance(() => (
//   <Modal visible={showModal} onDismiss={closeModal} animationType="slide">
//     <Onboarding closeModal={closeModal} />
//   </Modal>
// ));

export default OnboardingModal;
