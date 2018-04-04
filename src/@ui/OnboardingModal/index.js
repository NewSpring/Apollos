import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { Modal } from 'react-native';
import { AppLoading } from 'expo';
import BackgroundView from '@ui/BackgroundView';
import withOnboarding from '@data/withOnboarding';

import Onboarding from '../Onboarding';

const enhance = compose(
  withOnboarding,
  setPropTypes({
    isLoading: PropTypes.bool,
    onboarded: PropTypes.bool,
    didOnboard: PropTypes.func,
    children: PropTypes.node,
  }),
);

const OnboardingModal = enhance(({
  isLoading, onboarded, didOnboard, children,
}) => {
  if (isLoading) return <AppLoading />;

  return (
    <BackgroundView>
      {children}
      <Modal visible={!onboarded} onDismiss={didOnboard} animationType="slide">
        <Onboarding closeModal={didOnboard} />
      </Modal>
    </BackgroundView>
  );
});

export default OnboardingModal;
