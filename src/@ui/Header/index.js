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
}), 'Header.Container')(SafeAreaView);

const StyledHeaderText = styled(({ theme, barStyle }) => ({
  color: barStyle === 'dark-content' ? theme.colors.darkPrimary : theme.colors.lightPrimary,
}), 'Header.Text')(H6);

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
  backButton,
  backgroundColor,
  barStyle,
  children,
  theme,
}) => (
  <HeaderContainer style={backgroundColor ? { backgroundColor } : null}>
    <StatusBar barStyle={barStyle} />
    <StyledHeaderBar>
      {backButton ? <BackButton color={barStyle === 'dark-content' ? theme.colors.darkPrimary : undefined} /> : null}
      {titleText ? (<StyledHeaderText barStyle={barStyle}>{titleText}</StyledHeaderText>) : null}
      {children}
    </StyledHeaderBar>
  </HeaderContainer>
));

export default Header;
