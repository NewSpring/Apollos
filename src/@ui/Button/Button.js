import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { get } from 'lodash';
import { withTheme, withThemeMixin } from '@ui/theme';
import styled from '@ui/styled';
import Touchable from '@ui/Touchable';
import { H5 } from '@ui/typography';
import { InlineActivityIndicator } from '@ui/ActivityIndicator';
import { withPlaceholder, Line } from '@ui/Placeholder';
import sentry from '@utils/sentry';

const ButtonStyles = styled(({
  theme,
  disabled,
  bordered,
  pill,
}) => ({
  paddingHorizontal: theme.sizing.baseUnit,
  overflow: 'hidden',
  borderRadius: pill ? theme.sizing.baseUnit * 3 : theme.sizing.borderRadius,
  flexDirection: 'row',
  height: theme.sizing.baseUnit * 3,
  alignItems: 'center',
  justifyContent: 'center',
  opacity: disabled ? 0.5 : 1,
  borderWidth: 2,
  ...(bordered ? {
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.primary,
  } : {
    backgroundColor: theme.colors.background.default,
    borderColor: theme.colors.background.default,
    elevation: 2,
  }),
}), 'Button')(View);

const ButtonPlaceholder = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 4,
  height: theme.sizing.baseUnit + theme.helpers.rem(1),
}), 'Button.Placeholder')(Line);

export const withButtonPlaceholder = withPlaceholder(ButtonPlaceholder);

const trackButton = (props) => {
  sentry.captureBreadcrumb({
    message: 'ButtonPress',
    data: {
      title: props.title,
    },
    level: 'info',
  });
};

const enhance = compose(
  withButtonPlaceholder,
  withTheme(({ theme, type = 'default' }) => ({
    fill: get(theme, `buttons.${type}.fill`, theme.colors.action.default),
    accent: get(theme, `buttons.${type}.accent`, theme.colors.text.primary),
  })),
  // makes non-text children inherit button styles by default :-D
  withThemeMixin(({ fill, accent, bordered }) => ({
    colors: {
      primary: bordered ? fill : accent,
      text: { primary: bordered ? fill : accent },
      background: { default: fill, screen: fill },
    },
  })),
  withProps(({ onPress, ...otherProps }) => {
    if (!onPress) return {};
    const onPressAndTrack = (...args) => {
      if (onPress) onPress(...args);
      trackButton(otherProps);
    };
    return { onPress: onPressAndTrack };
  }),
);

// API-Compatible to React-Native's base <Button> component,
// except it supports the rendering of children, which will take precedence over the title prop,
// so you can handle non text children.
const Button = enhance(({
  children,
  disabled,
  title,
  to,
  onPress,
  style,
  bordered,
  loading,
  accent,
  pill,
  TouchableComponent = Touchable,
  ...touchableProps
}) => {
  const accessibilityTraits = ['button'];
  if (disabled || loading) accessibilityTraits.push('disabled');

  const buttonContent = (
    <ButtonStyles style={style} disabled={disabled} bordered={bordered} pill={pill}>
      {loading ? (
        <InlineActivityIndicator color={accent} />
      ) : (
        children || (<H5>{title}</H5>)
      )}
    </ButtonStyles>
  );

  if (onPress) {
    return (
      <TouchableComponent
        onPress={onPress}
        disabled={disabled || loading}
        accessibilityTraits={accessibilityTraits}
        {...touchableProps}
      >
        {buttonContent}
      </TouchableComponent>
    );
  }

  return buttonContent;
});

Button.defaultProps = {
  disabled: false,
  bordered: false,
  pill: true,
  title: '',
  accessibilityComponentType: 'button',
  type: 'primary',
};

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  bordered: PropTypes.bool,
  pill: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.oneOf(['default', 'primary', 'secondary', 'tertiary', 'ghost', 'alert']), // keys in theme.colors.action
  ...Touchable.propTypes,
};

export default Button;
