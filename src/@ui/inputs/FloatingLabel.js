import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet } from 'react-native';
import { H6 } from '@ui/typography';
import styled from '@ui/styled';

export const LabelText = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  backgroundColor: 'transparent',
  paddingVertical: theme.sizing.baseUnit / 4,
}), 'FloatingLabel.LabelText')(H6);

const styles = StyleSheet.create({
  floatLabelView: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    justifyContent: 'center',
  },
});

class FloatingLabel extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    animation: PropTypes.shape({
      interpolate: PropTypes.func,
    }),
    scaleSize: PropTypes.number, // how much smaller to make label when focused
    floatingOpacity: PropTypes.number,
  };

  static defaultProps = {
    animation: new Animated.Value(0),
    scaleSize: 0.8,
    floatingOpacity: 0.8,
  };

  state = {
    labelWidth: 0,
    labelHeight: 0,
  };

  handleLayout = ({ nativeEvent: { layout } }) => {
    this.setState({
      labelWidth: layout.width,
      labelHeight: layout.height,
    });
  };

  render() {
    const scaledWidth = this.state.labelWidth * (1.05 - this.props.scaleSize);
    const sideScaledWidth = scaledWidth / 2;
    const scale = this.props.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, this.props.scaleSize],
    });
    const opacity = this.props.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, this.props.floatingOpacity],
    });
    const translateY = this.props.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(this.state.labelHeight * 0.7)],
    });
    const translateX = this.props.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -sideScaledWidth],
    });
    const wrapperStyles = {
      transform: [{ scale }, { translateX }, { translateY }],
      opacity,
    };

    return (
      <Animated.View
        pointerEvents="none"
        onLayout={this.handleLayout}
        style={[styles.floatLabelView, wrapperStyles]}
      >
        <LabelText>
          {this.props.children}
        </LabelText>
      </Animated.View>
    );
  }
}

export default FloatingLabel;
