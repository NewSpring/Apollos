import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PickerItem extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.string,
  };

  static defaultProps = {
    value: null,
    label: '',
  };

  render() {
    const {
      value,
      label,
    } = this.props;

    return (
      <option value={value}>{label}</option>
    );
  }
}
