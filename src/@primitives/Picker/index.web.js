import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PickerItem from './PickerItem.web';

export default class Picker extends Component {
  static Item = PickerItem;

  static propTypes = {
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    children: PropTypes.node,
  };

  static defaultProps = {
    onValueChange() {},
    selectedValue: null,
    children: null,
  };

  handleOnChange = (e) => {
    const {
      value,
      options: { selectedIndex },
    } = e.currentTarget;

    this.props.onValueChange(value, selectedIndex);
  };

  render() {
    return (
      <select
        onChange={this.handleOnChange}
        value={this.props.selectedValue}
      >
        {this.props.children}
      </select>
    );
  }
}
