import React, { PureComponent } from 'react';
import { createElement } from 'react-native-web';
import { compose, mapProps } from 'recompose';
import PropTypes from 'prop-types';
import moment from 'moment';
import withInputControlStyles from '@ui/inputs/withInputControlStyles';

import { Text as TextInput } from '@ui/inputs';

const displayFormat = 'YYYY-MM-DD';

const NativeMappedDateInput = compose(
  mapProps(({
    onChangeText,
    style,
    ...otherProps
  }) => ({
    type: 'date',
    onChange: (e) => {
      const text = e.target.value;
      if (onChangeText) {
        onChangeText(text);
      }
    },
    style: [ // this will all get flattened by "withInputControlStyles" below
      {
        appearance: 'none',
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderRadius: 0,
        borderWidth: 0,
        boxSizing: 'border-box',
        color: 'inherit',
        padding: 0,
        resize: 'none',
      },
      style,
    ],
    ...otherProps,
  })),
  withInputControlStyles,
)(props => createElement('input', props));

class DateInput extends PureComponent {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onBlur: PropTypes.bool,
  };

  state = {
    internalDateValue: moment(this.props.value).format(displayFormat),
  };

  componentWillReceiveProps({ value }) {
    if (value !== this.props.value) {
      this.setState({
        internalDateValue: moment(value).format(displayFormat),
      });
    }
  }

  handleBlur = () => {
    if (this.props.onBlur) this.props.onBlur();
    if (this.props.onChange) this.props.onChange(this.parseValue(this.state.internalDateValue));
    if (this.props.onChangeText) this.props.onChangeText(this.state.internalDateValue);
  }

  handleChange = (text) => {
    this.setState({ internalDateValue: text });
  }

  parseValue = value => moment(value, displayFormat).toDate();

  render() {
    const {
      value, onChange, onChangeText, ...textInputProps
    } = this.props;
    return (
      <TextInput
        label="Date"
        placeholder={displayFormat}
        type="date"
        Component={NativeMappedDateInput}
        {...textInputProps}
        onBlur={this.handleBlur}
        value={this.state.internalDateValue}
        onChangeText={this.handleChange}
      />
    );
  }
}

export default DateInput;
