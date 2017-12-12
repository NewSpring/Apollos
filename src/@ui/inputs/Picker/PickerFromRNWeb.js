/* eslint-disable */
// TODO:
// This Picker was copy-pasta'd from react-native-web#master.
// We need to remove this and upgrade to the newest version of RNWeb when it is released.

/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Picker
 * @flow
 */

import applyNativeMethods from 'react-native-web/dist/modules/applyNativeMethods';
import { Component } from 'react';
import createElement from 'react-native-web/dist/modules/createElement';
import { StyleSheet } from 'react-native';
import { arrayOf, bool, func, number, oneOfType, string } from 'prop-types';

class PickerItem extends Component {
  static propTypes = {
    label: string.isRequired,
    testID: string,
    value: oneOfType([number, string]),
  };

  render() {
    const { label, testID, value } = this.props;
    return createElement('option', { label, testID, value });
  }
}

class Picker extends Component {
  static Item = PickerItem;

  render() {
    const {
      children,
      enabled,
      selectedValue,
      style,
      testID,
      /* eslint-disable */
      itemStyle,
      mode,
      prompt
      /* eslint-enable */
    } = this.props;

    return createElement('select', {
      children,
      disabled: enabled === false ? true : undefined,
      onChange: this._handleChange, // eslint-disable-line
      style: [styles.initial, style], // eslint-disable-line
      testID,
      value: selectedValue // eslint-disable-line
    });
  }

  _handleChange = (e: Object) => {
    const { onValueChange } = this.props; // eslint-disable-line
    const { selectedIndex, value } = e.target;
    if (onValueChange) {
      onValueChange(value, selectedIndex);
    }
  };
}

const styles = StyleSheet.create({
  initial: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    margin: 0,
  },
});

export default applyNativeMethods(Picker);
