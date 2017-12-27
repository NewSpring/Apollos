// Chippy!
import React from 'react';
import { compose, mapProps } from 'recompose';

import { UIText } from '@ui/typography';
import Button from '@ui/Button';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';
import styled from '@ui/styled';

export { default as ChipList } from './List';

const enhance = compose(
  withTheme(),
  mapProps(({ theme, selected, ...otherProps }) => ({
    type: selected ? 'primary' : 'default',
    iconSize: theme.sizing.baseUnit,
    ...otherProps,
  })),
);

const StyledUIText = styled({
  flexGrow: 1,
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 6,
})(UIText);

const StyledButton = styled(({ theme }) => ({
  justifyContent: 'flex-end',
  marginRight: theme.sizing.baseUnit / 2,
  marginBottom: theme.sizing.baseUnit / 2,
}), 'Chip')(Button);

const Chip = enhance(({
  icon,
  iconStyles = {},
  iconSize,
  selected,
  title,
  ...buttonProps
}) => (
  <StyledButton {...buttonProps}>
    <StyledUIText>{title}</StyledUIText>
    {icon ? <Icon name={icon} style={iconStyles} size={iconSize} /> : null}
  </StyledButton>
));

export default Chip;
