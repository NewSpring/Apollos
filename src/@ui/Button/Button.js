import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { get } from 'lodash';
import { withTheme, withThemeMixin } from '@ui/theme';
import styled from '@ui/styled';
import Touchable from '@ui/Touchable';
import { UIText } from '@ui/typography';


const ButtonStyles = styled(({ theme, disabled }) => ({
  elevation: 4,
  padding: theme.sizing.baseUnit / 2,
  overflow: 'hidden',
  backgroundColor: theme.colors.background.default,
  borderRadius: theme.sizing.borderRadius,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: disabled ? 0.5 : 1,
}), 'Button')(View);

const enhance = compose(
  withTheme(({ theme, type = 'default' }) => ({
    fill: get(theme, `buttons.${type}.fill`, theme.colors.action.default),
    accent: get(theme, `buttons.${type}.accent`, theme.colors.text.primary),
  })),
  // makes non-text children inherit button styles by default :-D
  withThemeMixin(({ fill, accent }) => ({
    colors: {
      primary: accent,
      text: { primary: accent },
      background: { default: fill, screen: fill },
    },
  })),
);

// API-Compatible to React-Native's base <Button> component,
// except it supports the rendering of children, which will take precedence over the title prop,
// so you can handle non text children.
const Button = enhance(({
  children,
  disabled,
  title,
  onPress,
  style,
  ...touchableProps
}) => {
  const accessibilityTraits = ['button'];
  if (disabled) accessibilityTraits.push('disabled');

  const buttonContent = (
    <ButtonStyles style={style} disabled={disabled}>
      {children || (<UIText>{title}</UIText>)}
    </ButtonStyles>
  );

  if (onPress) {
    return (
      <Touchable
        onPress={onPress}
        disabled={disabled}
        accessibilityTraits={accessibilityTraits}
        {...touchableProps}
      >
        {buttonContent}
      </Touchable>
    );
  }

  return buttonContent;
});

Button.defaultProps = {
  disabled: false,
  title: '',
  accessibilityComponentType: 'button',
};

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  type: PropTypes.oneOf(['default', 'primary', 'secondary', 'tertiary']), // keys in theme.colors.action
  ...Touchable.propTypes,
};

export default Button;
