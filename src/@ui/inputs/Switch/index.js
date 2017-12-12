import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { Animated, Switch, View } from 'react-native';
import { withTheme } from '@ui/theme';
import styled from '@ui/styled';

import { LabelText } from '../FloatingLabel';
import InputUnderline from '../InputUnderline';
import InputWrapper from '../InputWrapper';
import withInputControlStyles from '../withInputControlStyles';

const ControlWrapper = compose(
  styled({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  withInputControlStyles,
)(View);

const enhance = compose(
  pure,
  withTheme(({ theme }) => ({
    onTintColor: theme.colors.background.primary,
  })),
);

const Text = enhance(({
  label,
  ...switchProps
}) => (
  <InputWrapper>
    <ControlWrapper>
      <LabelText>{label}</LabelText>
      <Switch {...switchProps} />
    </ControlWrapper>
    <InputUnderline />
  </InputWrapper>
));

Text.propTypes = {
  label: PropTypes.node,
};

export default Text;
