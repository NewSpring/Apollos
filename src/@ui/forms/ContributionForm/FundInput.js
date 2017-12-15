import React from 'react';
import { View } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { H3 } from '@ui/typography';
import * as Inputs from '@ui/inputs';
import styled from '@ui/styled';

const FundInputWrapper = styled(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  paddingVertical: theme.sizing.baseUnit,
}), 'FindInput.Wrapper')(View);

const FundInput = (({
  isFirst = false,
  funds = [],
  value = {},
  onChange,
}) => (
  <FundInputWrapper>
    <H3>{isFirst ? 'I\'d like to give' : 'and give'}</H3>
    <View style={{ width: '50%' }}>
      <Inputs.Text
        placeholder="0.00"
        onChangeText={amount => onChange(Object.assign({}, value, { amount }))}
        value={get(value, 'amount')}
        style={{ width: 300 }}
      />
    </View>
    <H3>{'to'}</H3>
    <View style={{ width: '100%' }}>
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
  </FundInputWrapper>
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
