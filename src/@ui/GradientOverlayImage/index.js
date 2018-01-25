import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import Color from 'color';

import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import { CardImage } from '@ui/Card';
import LinearGradient from '@ui/LinearGradient';

const enhance = compose(
  pure,
  withTheme(),
  setPropTypes({
    source: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        uri: PropTypes.string,
        label: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      })),
      PropTypes.string,
    ]),
    overlayColor: PropTypes.string,
  }),
);

const Overlay = styled(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  ...Platform.select({
    android: { // fixes android borderRadius overflow display issue
      borderTopRightRadius: theme.sizing.borderRadius,
      borderTopLeftRadius: theme.sizing.borderRadius,
    },
  }),
}))(LinearGradient);

const getGradientValues = (overlayColor) => {
  const values = {
    colors: [`${Color(overlayColor).fade(1).string()}`, overlayColor],
    start: [0, 0],
    end: [0, 1],
    locations: [0.3, 1],
  };

  return values;
};

const GradientOverlayImage = enhance(({
  source: imageSource,
  overlayColor,
  theme,
  ...otherProps
}) => (
  <View {...otherProps}>
    <CardImage source={imageSource} />
    {overlayColor ? <Overlay
      colors={getGradientValues(overlayColor).colors}
      start={getGradientValues(overlayColor).start}
      end={getGradientValues(overlayColor).end}
      locations={getGradientValues(overlayColor).locations}
    /> : null}
  </View>
));

export default GradientOverlayImage;
