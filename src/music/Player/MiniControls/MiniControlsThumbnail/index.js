import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import styled from '@ui/styled';
import ConnectedImage from '@ui/ConnectedImage';
import Touchable from '@ui/Touchable';
import Icon from '@ui/Icon';

const enhance = compose(
  pure,
  setPropTypes({
    source: ConnectedImage.propTypes.source,
    isPlaying: PropTypes.bool,
  }),
);

const Wrapper = styled(({ theme }) => ({
  height: theme.sizing.baseUnit * 2, // based on MiniControls text sizing
  width: theme.sizing.baseUnit * 2,
}))(View);

const CloseButton = styled(StyleSheet.absoluteFillObject)(Touchable);

const Image = styled({
  aspectRatio: 1,
})(ConnectedImage);

const MiniControlsThumbnail = enhance(({ source, isPlaying }) => (
  <Wrapper>
    {isPlaying ? (
      <CloseButton>
        <Icon name="close" />
      </CloseButton>
    ) : null}
    <Image source={source} />
  </Wrapper>
));

export default MiniControlsThumbnail;
