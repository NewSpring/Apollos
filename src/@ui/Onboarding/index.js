import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';

const enhance = compose(pure, setPropTypes({}));

const Onboarding = enhance(() => <Text>Hello World!</Text>);

export default Onboarding;
