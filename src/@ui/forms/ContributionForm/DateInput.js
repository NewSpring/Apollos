import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Text as TextInput } from '@ui/inputs';

class DateInput extends PureComponent {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
  };

  state = {
    internalDateValue: moment(this.props.value).format('MM/DD/YYYY'),
  };

  handleChange = (text) => {
    this.props.onChange(this.parseValue(text));

    // todo: here we can parse text a bit, automatically add forward slashes, etc
    // to make it easier for user to type
    this.setState({ internalDateValue: text });
  }

  parseValue = value => new Date(value);

  render() {
    return (
      <TextInput
        label="Start Date"
        placeholder="MM/DD/YYYY"
        type="date"
        value={this.state.internalDateValue}
        onChangeText={this.handleChange}
      />
    );
  }
}

export default DateInput;
