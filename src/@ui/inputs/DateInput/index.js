import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Chip from '@ui/Chip';

class DateInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.any, // eslint-disable-line
    displayValue: PropTypes.string,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.any, // eslint-disable-line
  }

  state = {
    isVisible: false,
  };

  handleOpen = () => this.setState({ isVisible: true });

  handleClose = () => {
    this.setState({ isVisible: false });
    if (this.props.onBlur) this.props.onBlur();
  }

  handleConfirm = (value) => {
    if (this.props.onChange) this.props.onChange(value);
    if (this.props.onChangeText) {
      this.props.onChangeText(moment(value).format('MM/DD/YYYY'));
    }
    this.handleClose();
  }

  render() {
    let date = this.props.value;
    if (typeof date === 'string') date = moment(date).toDate();
    return (
      <View>
        <Chip title={this.props.displayValue || this.props.label} onPress={this.handleOpen} />
        <DateTimePicker
          date={date || new Date()}
          isVisible={this.state.isVisible}
          onConfirm={this.handleConfirm}
          onCancel={this.handleClose}
        />
      </View>
    );
  }
}

export default DateInput;
