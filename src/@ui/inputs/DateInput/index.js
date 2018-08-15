import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Animated } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Chip from '@ui/Chip';
import InputWrapper from '../InputWrapper';
import FloatingLabel from '../FloatingLabel';

const chipStyle = { marginTop: 5 };

class DateInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any, // eslint-disable-line
    displayValue: PropTypes.string,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.any, // eslint-disable-line
  };

  state = {
    isVisible: false,
  };

  handleOpen = () => this.setState({ isVisible: true });

  handleClose = () => {
    this.setState({ isVisible: false });
    if (this.props.onBlur) this.props.onBlur();
  };

  handleConfirm = (value) => {
    if (this.props.onChange) this.props.onChange(value);
    if (this.props.onChangeText) {
      this.props.onChangeText(moment(value).format('MM/DD/YYYY'));
    }
    this.handleClose();
  };

  render() {
    let date = this.props.value;
    if (typeof date === 'string') date = moment(date).toDate();
    return (
      <InputWrapper>
        <Chip
          style={chipStyle}
          title={this.props.displayValue || this.props.placeholder || this.props.label}
          onPress={this.handleOpen}
        />
        <DateTimePicker
          date={date || new Date()}
          isVisible={this.state.isVisible}
          onConfirm={this.handleConfirm}
          onCancel={this.handleClose}
          minimumDate={moment()
            .add(1, 'days')
            .toDate()}
        />
        {this.props.displayValue || this.props.placeholder ? (
          <FloatingLabel animation={new Animated.Value(1)}>{this.props.label}</FloatingLabel>
        ) : null}
      </InputWrapper>
    );
  }
}

export default DateInput;
