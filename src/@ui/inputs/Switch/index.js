import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { Switch, View } from 'react-native';
import { withTheme } from '@ui/theme';
import FlexedView from '@ui/FlexedView';
import styled from '@ui/styled';
import InputAddon, { AddonRow } from '../InputAddon';
import { LabelText } from '../FloatingLabel';
import InputWrapper from '../InputWrapper';
import { withInputControlViewStyles } from '../withInputControlStyles';
import ErrorText from '../ErrorText';

const ControlWrapper = withInputControlViewStyles(View);

const enhance = compose(
  pure,
  withTheme(({ theme }) => ({
    onTintColor: theme.colors.background.primary,
    thumbTintColor: theme.colors.background.paper,
    activeTrackColor: theme.colors.background.primary,
    activeThumbColor: theme.colors.background.paper,
    trackColor: theme.colors.background.inactive,
    tintColor: theme.colors.background.inactive,
  })),
);

const LabelContainer = styled({
  justifyContent: 'center',
})(FlexedView);

const Text = enhance(({
  label,
  prefix,
  error,
  wrapperStyle,
  ...switchProps
}) => (
  <InputWrapper style={wrapperStyle}>
    <ControlWrapper>
      <AddonRow>
        <InputAddon>{prefix}</InputAddon>
        <LabelContainer><LabelText>{label}</LabelText></LabelContainer>
        <InputAddon><Switch {...switchProps} /></InputAddon>
      </AddonRow>
    </ControlWrapper>

    {(error && typeof error === 'string') ? <ErrorText>{error}</ErrorText> : null}
  </InputWrapper>
));

Text.propTypes = {
  label: PropTypes.node,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Text;
