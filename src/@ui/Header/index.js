import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setPropTypes, branch, renderNothing, pure } from 'recompose';
import { withTheme } from '@ui/theme';
import SafeAreaView from '@ui/SafeAreaView';
import styled from '@ui/styled';
import { H6 } from '@ui/typography';

import BackButton from './BackButton';

const StyledHeaderBar = styled({
  height: 50,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}, 'Header.Bar')(View);

const HeaderContainer = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.primary,
}), 'Header.Container')(SafeAreaView);

const StyledHeaderText = styled(({ theme, barStyle }) => ({
  color: barStyle === 'dark-content' ? theme.colors.darkPrimary : theme.colors.lightPrimary,
}), 'Header.Text')(H6);

const enhance = compose(
  withTheme(),
  pure,
  branch(() => Platform.OS === 'web', renderNothing),
  setPropTypes({
    titleText: PropTypes.string,
    backButton: PropTypes.bool,
    barStyle: PropTypes.oneOf(['light-content', 'dark-content']),
  }),
);

const Header = enhance(({
  titleText,
  backButton = false,
  backgroundColor,
  barStyle = 'light-content',
  theme,
}) => (
  <HeaderContainer style={backgroundColor ? { backgroundColor } : null}>
    <StatusBar barStyle={barStyle} />
    <StyledHeaderBar>
      {backButton ? <BackButton color={barStyle === 'dark-content' ? theme.colors.darkPrimary : undefined} /> : null}
      <StyledHeaderText barStyle={barStyle}>{titleText}</StyledHeaderText>
    </StyledHeaderBar>
  </HeaderContainer>
));

export default Header;
