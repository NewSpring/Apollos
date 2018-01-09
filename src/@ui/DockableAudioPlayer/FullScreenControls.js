import React from 'react';
import { View } from 'react-native';
import { compose } from 'recompose';
import { withThemeMixin } from '@ui/theme';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import SafeAreaView from '@ui/SafeAreaView';
import GradientOverlayImage from '@ui/GradientOverlayImage';
import Icon from '@ui/Icon';
import Audio from '@ui/Audio';
import Touchable from '@ui/Touchable';
import { UIText, H7, H4 } from '@ui/typography';
import styled from '@ui/styled';

const Container = styled(({ theme, backgroundColor }) => ({
  backgroundColor: backgroundColor || theme.colors.background.default,
  justifyContent: 'space-between',
}))(FlexedView);

const Titles = styled({
  alignItems: 'center',
})(View);

const PlayerBody = styled({
  flex: 1,
})(SafeAreaView);

const Controls = styled({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
})(View);

const Settings = styled({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})(PaddedView);

const Ellipsis = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 4,
}))(props => <UIText {...props}>•••</UIText>);

const enhance = compose(
  withThemeMixin({ type: 'dark' }),
);

const FullScreenControls = enhance(({
  isPlaying,
  play,
  pause,
  next,
  prev,
  trackName,
  trackByLine,
  albumArt,
  color,
  handleClose,
}) => (
  <Container backgroundColor={color}>
    <GradientOverlayImage
      source={albumArt}
      overlayColor={color}
    />
    <PlayerBody>
      <Titles>
        <H4>{trackName}</H4>
        <H7>{trackByLine}</H7>
      </Titles>
      <Controls>
        <PaddedView>
          <Touchable onPress={prev}>
            <Icon name="skip-previous" size={32} />
          </Touchable>
        </PaddedView>
        <PaddedView>
          <Touchable onPress={isPlaying ? pause : play}>
            <Icon name={isPlaying ? 'pause' : 'play'} size={48} />
          </Touchable>
        </PaddedView>
        <PaddedView>
          <Touchable onPress={next}>
            <Icon name="skip-next" size={32} />
          </Touchable>
        </PaddedView>
      </Controls>
      <PaddedView>
        <Audio.Seeker />
      </PaddedView>
      <Settings>
        <PaddedView>
          <Touchable>
            <Icon name="shuffle" size={24} />
          </Touchable>
        </PaddedView>
        <PaddedView>
          <Touchable>
            <Icon name="repeat" size={24} />
          </Touchable>
        </PaddedView>
        <PaddedView>
          <Touchable>
            <Ellipsis />
          </Touchable>
        </PaddedView>
      </Settings>
      <Controls>
        <Touchable onPress={handleClose}><Icon name="arrow-down" /></Touchable>
      </Controls>
    </PlayerBody>
  </Container>
));

export default FullScreenControls;
