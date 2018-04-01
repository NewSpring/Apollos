import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import AppIntroSlider from 'react-native-app-intro-slider';

const enhance = compose(pure, setPropTypes({}));

const styles = StyleSheet.create({
  buttonCircle: {
    width: 80,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

const slides = [
  {
    key: 'one',
    image: require('../../assets/onboarding/onboard-img1.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'two',
    image: require('../../assets/onboarding/onboard-img2.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'three',
    image: require('../../assets/onboarding/onboard-img3.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'four',
    image: require('../../assets/onboarding/onboard-img4.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'five',
    image: require('../../assets/onboarding/onboard-img5.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'six',
    image: require('../../assets/onboarding/onboard-img6.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'seven',
    image: require('../../assets/onboarding/onboard-img7.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'eight',
    image: require('../../assets/onboarding/onboard-img8.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
];

const renderDoneButton = () => (
  <View style={styles.buttonCircle}>
    <Text style={styles.buttonText}>Done</Text>
  </View>
);

const renderNextButton = () => (
  <View style={styles.buttonCircle}>
    <Text style={styles.buttonText}>Next</Text>
  </View>
);

const renderPrevButton = () => (
  <View style={styles.buttonCircle}>
    <Text style={styles.buttonText}>Back</Text>
  </View>
);

const Onboarding = enhance(() => (
  <AppIntroSlider
    slides={slides}
    renderDoneButton={renderDoneButton}
    renderNextButton={renderNextButton}
    renderPrevButton={renderPrevButton}
    showPrevButton
  />
));

export default Onboarding;
