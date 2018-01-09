import React, { PureComponent } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Radio from '@ui/inputs/Radio';

export class ChangePaymentMethodForm extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: 'change payment method form',
  };

  render() {
    return (
      <View>
        <Text>{this.props.text}</Text>
        <Radio name="thing">
          <Radio.Button
            value="1"
            label="one"
          />
          <Radio.Button
            value="2"
            label="two"
          />
        </Radio>
      </View>
    );
  }
}

export default ChangePaymentMethodForm;
