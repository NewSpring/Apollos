import React from 'react';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styled from '@ui/styled';
import PaddedView from '@ui/PaddedView';
import Icon from '@ui/Icon';
import { H7 } from '@ui/typography';

const enhance = compose(
  pure,
  setPropTypes({
    titleText: PropTypes.string,
  }),
  defaultProps({
    titleText: 'Listen to audio',
  }),
);

const Banner = styled({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})(PaddedView);

const AudioBanner = enhance(({ titleText }) => (
  <Banner>
    <View>
      <H7>{titleText}</H7>
    </View>
    <Icon name={'audio'} />
  </Banner>
));

export default AudioBanner;
