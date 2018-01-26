import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import SafeAreaView from '@ui/SafeAreaView';
import PropTypes from 'prop-types';
import { compose, setPropTypes, branch, renderNothing, pure, defaultProps } from 'recompose';
import { withTheme, withThemeMixin } from '@ui/theme';
import styled from '@ui/styled';
import { H6 } from '@ui/typography';

import BackButton from './BackButton';

const StyledHeaderBar = styled(({ theme }) => ({
  height: 50,
  paddingHorizontal: theme.sizing.baseUnit / 2,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}), 'Header.Bar')(View);

const HeaderContainer = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.primary,
  ...Platform.select({
    android: {
      paddingTop: 25, // todo: this is currently required as SafeAreaView isn't
      // properly adding padding on android.
    },
  }),
}), 'Header.Container')(SafeAreaView);

const StyledHeaderText = styled(({ theme, barStyle }) => ({
  color: barStyle === 'dark-content' ? theme.colors.darkPrimary : theme.colors.lightPrimary,
}), 'Header.Text')(H6);

const RightContainer = styled({
  position: 'absolute',
  right: 4,
  top: 0,
  bottom: 0,
  justifyContent: 'center',
}, 'Header.RightContainer')(View);

const enhance = compose(
  defaultProps({
    backButton: false,
    barStyle: 'light-content',
    children: null,
  }),
  setPropTypes({
    titleText: PropTypes.string,
    backButton: PropTypes.bool,
    barStyle: PropTypes.oneOf(['light-content', 'dark-content']),
    children: PropTypes.node,
  }),
  withThemeMixin(({ theme, barStyle }) => ({
    type: (barStyle === 'light-content') ? 'dark' : 'light',
    colors: {
      background: {
        ...theme.colors.background,
        default: theme.colors.background.primary,
      },
    },
  })),
  withTheme(),
  pure,
  branch(() => Platform.OS === 'web', renderNothing),
);

const Header = enhance(({
  titleText,
  right,
  backButton = false,
  barStyle = 'light-content',
  style = {},
  backgroundColor,
  children,
  theme,
}) => (
  <HeaderContainer style={[backgroundColor ? { backgroundColor } : null, style]}>
    <StatusBar barStyle={barStyle} />
    <StyledHeaderBar>
      {backButton ? <BackButton color={barStyle === 'dark-content' ? theme.colors.darkPrimary : undefined} /> : null}
      {titleText ? (<StyledHeaderText barStyle={barStyle}>{titleText}</StyledHeaderText>) : null}
      {children}
      {right ? <RightContainer>{right}</RightContainer> : null}
    </StyledHeaderBar>
  </HeaderContainer>
));

export default Header;
