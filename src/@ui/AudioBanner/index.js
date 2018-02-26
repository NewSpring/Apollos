import React from 'react';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { withTheme } from '@ui/theme';
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
  withTheme(({ theme: { helpers: { rem = {} } = {} } = {} }) => ({ rem })),
);

const Banner = styled({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})(PaddedView);

const AudioBanner = enhance(({ titleText, rem }) => (
  <Banner>
    <View>
      <H7>{titleText}</H7>
    </View>
    <Icon name={'audio'} size={rem(1)} />
  </Banner>
));

export default AudioBanner;
