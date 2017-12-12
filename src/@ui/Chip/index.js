// Chippy!
import React from 'react';
import { compose, mapProps } from 'recompose';

import { UIText } from '@ui/typography';
import Button from '@ui/Button';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';
import styled from '@ui/styled';

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

const Chip = enhance(({
  icon,
  iconStyles = {},
  iconSize,
  selected,
  title,
  ...buttonProps
}) => (
  <Button {...buttonProps} style={{ justifyContent: 'flex-end' }}>
    <StyledUIText>{title}</StyledUIText>
    {icon ? <Icon name={icon} style={iconStyles} size={iconSize} /> : null}
  </Button>
));

export default Chip;
