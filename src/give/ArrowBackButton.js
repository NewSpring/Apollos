import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from '@ui/Icon';
import { H7 } from '@ui/typography';
import styled from '@ui/styled';
import Spacer from '@ui/Spacer';
import { withTheme } from '@ui/theme';

const Row = styled(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: theme.sizing.baseUnit / 2,
}))(View);

const StyledH7 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H7);

const StyledIcon = withTheme(({ theme }) => ({
  fill: theme.colors.text.secondary,
  size: theme.sizing.baseUnit,
}))(Icon);

export default function ArrowBack({ onPress } = {}) {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <Row>
        <StyledIcon
          name="arrow-back"
        />
        <Spacer byWidth />
        <StyledH7>{'Back'}</StyledH7>
      </Row>
    </TouchableWithoutFeedback>
  );
}
