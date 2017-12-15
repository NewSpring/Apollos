import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import * as Inputs from '@ui/inputs';

const FundInput = (({
  isFirst = false,
  funds = [],
  value = {},
  onChange,
}) => (
  <View>
    <Text>{isFirst ? 'I\'d like to give' : 'and give'}</Text>
    <Inputs.Text
      placeholder="0.00"
      onChangeText={amount => onChange(Object.assign({}, value, { amount }))}
      value={get(value, 'amount')}
    />
    <Text>{'to'}</Text>
    <Inputs.Picker
      onValueChange={id => onChange(Object.assign({}, value, funds.find(fund => fund.id === id)))}
      value={get(value, 'id')}
      displayValue={get(value, 'name')}
    >
      {funds.map(({ name, id }) => (
        <Inputs.PickerItem label={name} value={id} key={id} />
      ))}
    </Inputs.Picker>
  </View>
));

FundInput.propTypes = {
  funds: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  isFirst: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    amount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
};

export default FundInput;
