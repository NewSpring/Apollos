import React from 'react';
import { Platform, View } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { H3, H4 } from '@ui/typography';
import * as Inputs from '@ui/inputs';
import styled from '@ui/styled';

const StyledTextInput = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1.8),
  fontWeight: '700',
  ...Platform.select({
    android: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  }),
}), 'FundInput.TextInput')(Inputs.Text);

const StyledPicker = styled(({ theme }) => ({
  color: theme.colors.primary,
  ...Platform.select({ // RN android doesn't support setting these values at this time
    ios: {
      fontSize: theme.helpers.rem(1.8),
      fontWeight: '700',
    },
    web: {
      fontSize: theme.helpers.rem(1.8),
      fontWeight: '700',
    },
  }),
}), 'FundInput.Picker')(Inputs.Picker);

const FundInputWrapper = styled(({ theme }) => ({
  alignItems: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  paddingVertical: theme.sizing.baseUnit,
}), 'FundInput.Wrapper')(View);

const CurrencyLabel = styled(({ amount }) => ({
  opacity: amount > 0 ? 1 : 0.5,
}), 'FundInput.CurrencyLabel')(H4);

const textWrapperStyle = { marginTop: 2, marginBottom: 0 };
const pickerWrapperStyle = {
  marginBottom: 0,
  marginTop: Platform.OS === 'web' ? 2 : 6,
};

const FundInput = (({
  isFirst = false,
  funds = [],
  value = {},
  onChange,
  ...textInputProps
}) => (
  <FundInputWrapper>
    <H3>{isFirst ? 'I\'d like to give ' : 'and give '}</H3>
    <View style={{ width: 150 }}>
      <StyledTextInput
        placeholder="0.00"
        onChangeText={amount => onChange(Object.assign({}, value, { amount }))}
        type="numeric"
        prefix={<CurrencyLabel amount={get(value, 'amount')}>$</CurrencyLabel>}
        value={get(value, 'amount')}
        wrapperStyle={textWrapperStyle}
        {...textInputProps}
      />
    </View>
    <H3>{'to '}</H3>
    <View style={{ width: 325, maxWidth: '100%' }}>
      <StyledPicker
        onValueChange={id => onChange(Object.assign({}, value, funds.find(fund => `${fund.id}` === `${id}`)))}
        value={get(value, 'id')}
        displayValue={get(value, 'name')}
        wrapperStyle={pickerWrapperStyle}
      >
        {funds.map(({ name, id }) => (
          <Inputs.PickerItem label={name} value={id} key={id} />
        ))}
      </StyledPicker>
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

FundInput.defaultProps = {
  funds: [],
  isFirst: false,
  onChange() {},
  value: {},
};

export default FundInput;
