import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import { BlurView as ExpoBlurView } from 'expo';
import styled from '@ui/styled';

const FilledBlurView = styled(StyleSheet.absoluteFill)(ExpoBlurView);

const BlurView = ({
  intensity, tint, children, ...viewProps
}) => (
  <View {...viewProps}>
    {children}
    <FilledBlurView intensity={intensity} tint={tint} />
  </View>
);

BlurView.propTypes = {
  ...ExpoBlurView.propTypes,
  ...ViewPropTypes,
};

export default BlurView;
