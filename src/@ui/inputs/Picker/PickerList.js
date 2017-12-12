import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Picker as NativePicker, Animated } from 'react-native';
import styled from '@ui/styled';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  pickerPositionReset: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

const StyledPicker = styled(({ theme }) => ({
  borderTopWidth: StyleSheet.hairlineWidth,
  borderTopColor: theme.colors.background.inactive,
}), 'Inputs.Picker.List')(NativePicker);

class PickerList extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    children: PropTypes.node,
    focusAnimation: PropTypes.shape({
      interpolate: PropTypes.func,
    }),
    mode: PropTypes.string,
  }

  static defaultProps = {
    mode: 'dropdown',
  }

  state = {
    pickerHeight: 0,
  };

  handleLayout = ({ nativeEvent: { layout } }) => {
    this.setState({ pickerHeight: layout.height });
  };

  render() {
    const {
      focusAnimation,
      value,
      ...pickerProps
    } = this.props;
    const height = this.props.focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.state.pickerHeight],
    });
    return (
      <Animated.View style={[styles.container, { height }]}>
        <View style={styles.pickerPositionReset} onLayout={this.handleLayout}>
          <StyledPicker selectedValue={this.props.value} {...pickerProps} />
        </View>
      </Animated.View>
    );
  }
}

export default PickerList;
