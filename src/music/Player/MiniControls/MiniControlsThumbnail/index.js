import React, { PureComponent } from 'react';
import { compose, pure } from 'recompose';
import { View, InteractionManager, Animated, Easing, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Color from 'color';

import styled from '@ui/styled';
import Touchable from '@ui/Touchable';
import { withTheme, withThemeMixin } from '@ui/theme';
import ConnectedImage from '@ui/ConnectedImage';
import Icon from '@ui/Icon';

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    zIndex: 2,
  },
});

const Wrapper = styled(({ theme }) => ({
  height: theme.sizing.baseUnit * 2, // based on MiniControls text sizing
  width: theme.sizing.baseUnit * 2,
  overflow: 'hidden',
  backgroundColor: theme.colors.background.default, // fixes Android overflow bug
}))(View);

const IconWrapper = compose(
  withThemeMixin({ type: 'light' }),
  styled(({ theme }) => ({
    padding: 7,
    backgroundColor: Color(theme.colors.background.default).fade(theme.alpha.low),
  })),
)(View);

const ThemedIcon = compose(
  pure,
  withThemeMixin({ type: 'light' }),
  withTheme(
    ({
      theme: {
        sizing: { baseUnit = {} } = {},
        colors: { text: { primary: primaryTextColor = {} } = {} } = {},
      } = {},
    }) => ({
      size: baseUnit * 1.3,
      fill: primaryTextColor,
    }),
  ),
)(Icon);

const Image = styled({
  aspectRatio: 1,
})(ConnectedImage);

class MiniControlsThumbnail extends PureComponent {
  static propTypes = {
    source: ConnectedImage.propTypes.source.isRequired,
    isPlaying: PropTypes.bool,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    isPlaying: false,
  };

  constructor() {
    super();

    this.animatedButtonPosition = new Animated.Value(-40);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(this.animatedButtonPosition, {
          toValue: nextProps.isPlaying ? -40 : 0,
          duration: 200,
          delay: nextProps.isPlaying ? 0 : 1500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      });
    }
  }

  render() {
    const animate = { transform: [{ translateY: this.animatedButtonPosition }] };

    return (
      <Wrapper>
        <Animated.View style={[animate, styles.closeButton]}>
          <Touchable useForeground onPress={this.props.onPress}>
            <IconWrapper>
              <ThemedIcon name="close" />
            </IconWrapper>
          </Touchable>
        </Animated.View>
        <Image source={this.props.source} />
      </Wrapper>
    );
  }
}

export default MiniControlsThumbnail;
