import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import styled from '@ui/styled';
import ConnectedImage from '@ui/ConnectedImage';
import PaddedView from '@ui/PaddedView';
import FlexedView from '@ui/FlexedView';
import { withThemeMixin } from '@ui/theme';
import { H4 } from '@ui/typography';

const BackgroundContainer = styled(({ theme, backgroundColor }) => ({
  backgroundColor: backgroundColor || theme.colors.darkPrimary,
  ...StyleSheet.absoluteFillObject,
}))(View);

const BackgroundFade = styled(({ opacity }) => ({
  opacity: opacity || 0.8,
  alignItems: 'stretch',
  ...StyleSheet.absoluteFillObject,
}))(View);

const Content = styled({
  alignItems: 'center',
  justifyContent: 'center',
})(PaddedView);

const Brand = styled(({ theme }) => ({
  color: theme.colors.white,
  position: 'absolute',
  bottom: theme.sizing.baseUnit,
  right: theme.sizing.baseUnit,
  ...Platform.select({
    web: {
      right: 0,
      bottom: 0,
      'text-shadow': '0 0 10px #858585', // todo
      transform: 'rotate(-90deg) translateY(300%)',
      'transform-origin': '0% 0%',
    },
  }),
}))(H4);

const Container = styled({
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
})(FlexedView);

export const BackgroundImage = styled({
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
})(ConnectedImage);

const Hero = withThemeMixin({ type: 'dark' })(({
  brandText = 'NEWSPRING',
  backgroundColor,
  backgroundOpacity,
  background,
  children,
  style,
  contentContainerStyle = {},
}) => (
  <Container style={style}>
    <BackgroundContainer backgroundColor={backgroundColor}>
      <BackgroundFade opacity={backgroundOpacity}>{background}</BackgroundFade>
    </BackgroundContainer>
    <Content style={contentContainerStyle}>
      {children}
    </Content>
    <Brand>{brandText}</Brand>
  </Container>
));

Hero.propTypes = {
  brandText: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundOpacity: PropTypes.number,
  background: PropTypes.node,
  children: PropTypes.node,
  style: PropTypes.any, // eslint-disable-line
  contentContainerStyle: PropTypes.any, // eslint-disable-line
};

export default Hero;
