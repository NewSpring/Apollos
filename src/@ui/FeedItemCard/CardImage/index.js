import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import Color from 'color';

import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import ConnectedImage from '@ui/ConnectedImage';
import LinearGradient from '@ui/LinearGradient';

const enhance = compose(
  pure,
  withTheme(),
  setPropTypes({
    source: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string,
        description: PropTypes.string,
      })),
      PropTypes.string,
    ]),
    overlayColor: PropTypes.string,
  }),
);

const Wrapper = styled(({ theme }) => ({
  ...Platform.select({
    android: { // fixes android borderRadius overflow display issue
      borderTopRightRadius: theme.sizing.borderRadius,
      borderTopLeftRadius: theme.sizing.borderRadius,
    },
  }),
}))(View);

const StyledImage = styled(({ theme }) => ({
  width: '100%',
  aspectRatio: 1,
  resizeMode: 'cover',
  ...Platform.select({
    android: { // fixes android borderRadius overflow display issue
      borderTopRightRadius: theme.sizing.borderRadius,
      borderTopLeftRadius: theme.sizing.borderRadius,
    },
    web: {
      // web doesn't support aspectRatio, this hacks it:
      height: 0,
      paddingTop: '100%',
    },
  }),
}))(ConnectedImage);

const Overlay = styled(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  ...Platform.select({
    android: { // fixes android borderRadius overflow display issue
      borderTopRightRadius: theme.sizing.borderRadius,
      borderTopLeftRadius: theme.sizing.borderRadius,
    },
  }),
}))(LinearGradient);

const CardImage = enhance(({
  source: imageSource,
  overlayColor,
}) => (
  <Wrapper>
    <StyledImage source={imageSource} />
    {overlayColor ? <Overlay colors={[`${Color(overlayColor).fade(1)}`, overlayColor]} start={[0, 0]} end={[0, 1]} locations={[0.3, 1]} /> : null}
  </Wrapper>
));

export default CardImage;
