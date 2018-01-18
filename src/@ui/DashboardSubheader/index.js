import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { H6, H7 } from '@ui/typography';
import styled from '@ui/styled';
import Button from '@ui/Button';

const Row = styled(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: theme.sizing.baseUnit / 2,
  marginTop: theme.sizing.baseUnit * 2,
  marginBottom: theme.sizing.baseUnit,
}))(View);

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.darkTertiary,
}))(H6);

const StyledH7 = styled(({ theme }) => ({
  color: theme.colors.darkTertiary,
}))(H7);

const StyledButton = styled(({ theme }) => ({
  color: theme.colors.darkTertiary,
  borderColor: theme.colors.darkTertiary,
  paddingVertical: theme.sizing.baseUnit / 6,
  paddingHorizontal: theme.sizing.baseUnit,
  borderWidth: 1,
}))(Button);

function DashboardSubheader(props) {
  return (
    <Row>
      <StyledH6>{props.text}</StyledH6>
      <StyledButton
        bordered
        pill
        onPress={props.onPress}
      >
        <StyledH7>{props.buttonText}</StyledH7>
      </StyledButton>
    </Row>
  );
}

DashboardSubheader.propTypes = {
  text: PropTypes.string,
  buttonText: PropTypes.string,
  onPress: PropTypes.func,
};

DashboardSubheader.defaultProps = {
  text: '',
  buttonText: '',
  onPress() {},
};

export default DashboardSubheader;
