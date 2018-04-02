import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import AppIntroSlider from 'react-native-app-intro-slider';

const enhance = compose(pure, setPropTypes({}));

const styles = StyleSheet.create({
  buttonCircle: {
    width: 80,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .5)',
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
    image: require('../../assets/onboarding/1-Welcome.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#6bac43',
  },
  {
    key: 'two',
    image: require('../../assets/onboarding/2-Stories.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#6bac43',
  },
  {
    key: 'three',
    image: require('../../assets/onboarding/3-Sermons.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#6bac43',
  },
  {
    key: 'four',
    image: require('../../assets/onboarding/4-Music.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#6bac43',
  },
  {
    key: 'five',
    image: require('../../assets/onboarding/5-Scripture.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#6bac43',
  },
  {
    key: 'six',
    image: require('../../assets/onboarding/6-Favorites.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#6bac43',
  },
  {
    key: 'seven',
    image: require('../../assets/onboarding/7-Campus.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#6bac43',
  },
  {
    key: 'eight',
    image: require('../../assets/onboarding/8-Get-Started.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#6bac43',
  },
];

const renderDoneButton = () => (
  <View style={styles.buttonCircle}>
    <Text style={styles.buttonText}>Done</Text>
  </View>
);

// const renderNextButton = () => (
//   <View style={styles.buttonCircle}>
//     <Text style={styles.buttonText}>Next</Text>
//   </View>
// );
//
// const renderPrevButton = () => (
//   <View style={styles.buttonCircle}>
//     <Text style={styles.buttonText}>Back</Text>
//   </View>
// );

const Onboarding = enhance(() => (
  <AppIntroSlider hideNextButton renderDoneButton={renderDoneButton} slides={slides} />
));

export default Onboarding;
