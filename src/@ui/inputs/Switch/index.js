import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { Switch, View } from 'react-native';
import { withTheme } from '@ui/theme';
import styled from '@ui/styled';

import { LabelText } from '../FloatingLabel';
import InputWrapper from '../InputWrapper';
import { withInputControlViewStyles } from '../withInputControlStyles';

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
  ...switchProps
}) => (
  <InputWrapper>
    <ControlWrapper>
      <LabelText>{label}</LabelText>
      <Switch {...switchProps} />
    </ControlWrapper>
  </InputWrapper>
));

Text.propTypes = {
  label: PropTypes.node,
};

export default Text;
