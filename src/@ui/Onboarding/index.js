import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import AppIntroSlider from 'react-native-app-intro-slider';

const enhance = compose(pure, setPropTypes({}));

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

const slides = [
  {
    key: 'one',
    title: 'Slide 1',
    text: 'Some text for slide 1',
    image: require('../../assets/onboarding/onboard-img1.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'two',
    title: 'Slide 2',
    text: 'Some text for slide 2',
    image: require('../../assets/onboarding/onboard-img2.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'three',
    title: 'Slide 3',
    text: 'Some text for slide 3',
    image: require('../../assets/onboarding/onboard-img3.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'four',
    title: 'Slide 4',
    text: 'Some text for slide 4',
    image: require('../../assets/onboarding/onboard-img4.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'five',
    title: 'Slide 5',
    text: 'Some text for slide 5',
    image: require('../../assets/onboarding/onboard-img5.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'six',
    title: 'Slide 6',
    text: 'Some text for slide 6',
    image: require('../../assets/onboarding/onboard-img6.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'seven',
    title: 'Slide 7',
    text: 'Some text for slide 7',
    image: require('../../assets/onboarding/onboard-img7.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'eight',
    title: 'Slide 8',
    text: 'Some text for slide 8',
    image: require('../../assets/onboarding/onboard-img8.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
];
const Onboarding = enhance(() => <AppIntroSlider slides={slides} />);

export default Onboarding;
