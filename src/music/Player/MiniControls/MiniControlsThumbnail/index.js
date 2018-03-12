import React, { PureComponent } from 'react';
import { compose, pure } from 'recompose';
import { View, InteractionManager } from 'react-native';
import PropTypes from 'prop-types';
import Color from 'color';

import styled from '@ui/styled';
import Touchable from '@ui/Touchable';
import { withTheme } from '@ui/theme';
import ConnectedImage from '@ui/ConnectedImage';
import Icon from '@ui/Icon';

const Wrapper = styled(({ theme }) => ({
  height: theme.sizing.baseUnit * 2, // based on MiniControls text sizing
  width: theme.sizing.baseUnit * 2,
}))(View);

const CloseButton = styled({
  position: 'absolute',
  zIndex: 2,
})(View);

const ThemedIcon = compose(
  pure,
  withTheme(
    ({
      theme: {
        sizing: { baseUnit = {} } = {},
        colors: { text: { primary: primaryTextColor = {} } = {} } = {},
      } = {},
    }) => ({
      size: baseUnit * 2,
      fill: primaryTextColor,
    }),
  ),
  styled(({ theme }) => ({
    backgroundColor: Color(theme.colors.background.default).fade(theme.alpha.low),
  })),
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

  constructor(props) {
    super(props);
    this.state = {
      hideButton: this.props.isPlaying,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) {
      return;
    }

    InteractionManager.runAfterInteractions(() =>
      setTimeout(
        () =>
          this.setState({
            hideButton: nextProps.isPlaying,
          }),
        1000,
      ),
    );
  }

  render() {
    return (
      <Wrapper>
        {this.state.hideButton ? null : (
          <CloseButton>
            <Touchable useForeground onPress={this.props.onPress}>
              <ThemedIcon name="close" />
            </Touchable>
          </CloseButton>
        )}
        <Image source={this.props.source} />
      </Wrapper>
    );
  }
}

export default MiniControlsThumbnail;
