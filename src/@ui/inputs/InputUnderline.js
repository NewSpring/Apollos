import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from '@ui/styled';

const FocusedUnderline = styled(({ theme, hasError }) => ({
  height: StyleSheet.hairlineWidth,
  backgroundColor: hasError ? theme.colors.alert : theme.colors.background.primary,
  bottom: 0,
}), 'InputUnderline.focused')(View);

const BluredUnderline = styled(({ theme }) => ({
  height: StyleSheet.hairlineWidth,
  backgroundColor: theme.colors.background.inactive,
  bottom: -StyleSheet.hairlineWidth,
}), 'InputUnderline.blurred')(View);

const styles = StyleSheet.create({
  wrapper: {
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const InputUnderline = ({ animation = new Animated.Value(0), hasError = false }) => {
  let scaleX = animation.interpolate({ inputRange: [0, 1], outputRange: [0.0001, 1] });
  if (hasError) scaleX = 1;

  const transform = [
    { scaleX },
  ];

  return (
    <View style={styles.wrapper}>
      <BluredUnderline />
      <Animated.View style={[styles.wrapper, { transform }]}>
        <FocusedUnderline hasError={hasError} />
      </Animated.View>
    </View>
  );
};

InputUnderline.propTypes = {
  animation: PropTypes.shape({
    interpolate: PropTypes.func,
  }),
  hasError: PropTypes.bool,
};

export default InputUnderline;
