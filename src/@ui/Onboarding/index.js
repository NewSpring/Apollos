import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import AppIntroSlider from 'react-native-app-intro-slider';
import Chip from '@ui/Chip';

const enhance = compose(pure, setPropTypes({ closeModal: PropTypes.func }));

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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

const renderDoneButton = () => <Chip pill title="Go" type="secondary" />;

const Onboarding = enhance(({ closeModal }) => (
  <AppIntroSlider
    hideNextButton
    onDone={closeModal}
    renderDoneButton={renderDoneButton}
    slides={slides}
  />
));

Onboarding.propTypes = {
  closeModal: PropTypes.func,
};

export default Onboarding;
