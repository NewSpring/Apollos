import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { Switch, View } from 'react-native';
import { withTheme } from '@ui/theme';
import styled from '@ui/styled';

import { LabelText } from '../FloatingLabel';
import InputWrapper from '../InputWrapper';
import { withInputControlViewStyles } from '../withInputControlStyles';
import ErrorText from '../ErrorText';

const ControlWrapper = compose(
  withInputControlViewStyles,
  styled({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
)(View);

const enhance = compose(
  pure,
  withTheme(({ theme }) => ({
    onTintColor: theme.colors.background.primary,
  })),
);

const Text = enhance(({
  label,
  error,
  wrapperStyle,
  ...switchProps
}) => (
  <InputWrapper style={wrapperStyle}>
    <ControlWrapper>
      <LabelText>{label}</LabelText>
      <Switch {...switchProps} />
    </ControlWrapper>

    {(error && typeof error === 'string') ? <ErrorText>{error}</ErrorText> : null}
  </InputWrapper>
));

Text.propTypes = {
  label: PropTypes.node,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Text;
