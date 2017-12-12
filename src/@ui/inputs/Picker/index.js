import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Picker as NativePicker, TouchableOpacity } from 'react-native';
import styled from '@ui/styled';

import { UIText } from '@ui/typography';
import Icon from '@ui/Icon';
import createInput from '../createInput';
import InputAddon, { AddonRow } from '../InputAddon';
import withInputControlStyles from '../withInputControlStyles';

import PickerList from './PickerList';

const StyledUIText = withInputControlStyles(UIText);
const Placeholder = styled(({ theme }) => ({
  color: theme.colors.input.placeholder,
}), 'Inputs.Picker.Placeholder')(UIText);

class Picker extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    displayValue: PropTypes.string,
    focusAnimation: PropTypes.any, // eslint-disable-line
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  state = {
    focused: false,
  };

  toggle = () => {
    const focused = !this.state.focused;
    this.setState({ focused }, () => {
      if (focused) {
        this.props.onFocus();
      } else {
        this.props.onBlur();
      }
    });
  }

  render() {
    const {
      displayValue,
      focusAnimation, // from createInput
      placeholder,
      ...pickerProps
    } = this.props;
    const rotate = focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    return (
      <View>
        <TouchableOpacity onPress={this.toggle}>
          <AddonRow>
            <Animated.View style={{ opacity: focusAnimation, flex: 1 }}>
              <StyledUIText>
                {displayValue || (<Placeholder>{placeholder}</Placeholder>)}
              </StyledUIText>
            </Animated.View>
            <InputAddon>
              <Animated.View style={{ transform: [{ rotate }] }}>
                <Icon name="arrow-down" size={18} />
              </Animated.View>
            </InputAddon>
          </AddonRow>
        </TouchableOpacity>
        <PickerList {...pickerProps} focusAnimation={focusAnimation} />
      </View>
    );
  }
}

export default createInput(Picker);
export const { Item } = NativePicker;
