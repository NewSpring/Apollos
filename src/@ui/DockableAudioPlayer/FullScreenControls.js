import React from 'react';
import FlexedView from '@ui/FlexedView';
import GradientOverlayImage from '@ui/GradientOverlayImage';
import styled from '@ui/styled';

const Container = styled(({ theme, backgroundColor }) => ({
  backgroundColor: backgroundColor || theme.colors.background.default,
}))(FlexedView);

const FullScreenControls = ({
  isPlaying,
  play,
  pause,
  next,
  prev,
  trackName,
  trackByLine,
  albumArt,
  color,
}) => (
  <Container>
    <GradientOverlayImage
      source={albumArt}
      overlayColor={color}
    />
  </Container>
);

export default FullScreenControls;
