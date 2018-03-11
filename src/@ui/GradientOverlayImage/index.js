import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import Color from 'color';

import styled from '@ui/styled';
import ConnectedImage from '@ui/ConnectedImage';
import LinearGradient from '@ui/LinearGradient';

const enhance = compose(
  pure,
  setPropTypes({
    source: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          uri: PropTypes.string,
          label: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
        }),
      ),
      PropTypes.string,
    ]),
    overlayColor: PropTypes.string,
    ImageComponent: PropTypes.func,
  }),
);

const Overlay = styled(StyleSheet.absoluteFillObject)(LinearGradient);

const getGradientValues = (overlayColor) => {
  const values = {
    colors: [
      `${Color(overlayColor)
        .fade(1)
        .string()}`,
      overlayColor,
    ],
    start: [0, 0],
    end: [0, 1],
    locations: [0.3, 1],
  };

  return values;
};

const DefaultImageComponent = styled({
  width: '100%',
  aspectRatio: 1,
  resizeMode: 'cover',
  ...Platform.select({
    web: {
      // web doesn't support aspectRatio, this hacks it:
      height: 0,
      paddingTop: '100%',
    },
  }),
})(ConnectedImage);

const GradientOverlayImage = enhance(
  ({
    source: imageSource, overlayColor, ImageComponent: ComponentProp, ...otherProps
  }) => {
    const Component = ComponentProp || DefaultImageComponent;
    return (
      <View {...otherProps}>
        <Component source={imageSource} />
        {overlayColor ? (
          <Overlay
            colors={getGradientValues(overlayColor).colors}
            start={getGradientValues(overlayColor).start}
            end={getGradientValues(overlayColor).end}
            locations={getGradientValues(overlayColor).locations}
          />
        ) : null}
      </View>
    );
  },
);

export default GradientOverlayImage;
