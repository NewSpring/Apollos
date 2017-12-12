import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from '@ui/styled';

const FocusedUnderline = styled(({ theme }) => ({
  height: StyleSheet.hairlineWidth,
  backgroundColor: theme.colors.background.primary,
  bottom: 0,
}), 'InputUnderline.blurred')(View);

const BluredUnderline = styled(({ theme }) => ({
  height: StyleSheet.hairlineWidth,
  backgroundColor: theme.colors.background.inactive,
  bottom: -StyleSheet.hairlineWidth,
}), 'InputUnderline.focused')(View);

const styles = StyleSheet.create({
  wrapper: {
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const InputUnderline = ({ animation }) => {
  const transform = [
    { scaleX: animation.interpolate({ inputRange: [0, 1], outputRange: [0.0001, 1] }) },
  ];

  return (
    <View style={styles.wrapper}>
      <BluredUnderline />
      <Animated.View style={[styles.wrapper, { transform }]}>
        <FocusedUnderline />
      </Animated.View>
    </View>
  );
};

InputUnderline.propTypes = {
  animation: PropTypes.shape({
    interpolate: PropTypes.func,
  }),
};

export default InputUnderline;
