import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setPropTypes, branch, renderNothing, pure } from 'recompose';
import SafeAreaView from '@ui/SafeAreaView';
import styled from '@ui/styled';
import { UIText } from '@ui/typography';

import BackButton from './BackButton';

const StyledHeaderBar = styled({
  height: 50,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}, 'Header.Bar')(View);

const HeaderContainer = styled(({ theme }) => ({
  backgroundColor: theme.colors.primary,
}), 'Header.Container')(SafeAreaView);

const StyledHeaderText = styled(({ theme }) => ({
  color: theme.colors.text.appHeader,
}), 'Header.Text')(UIText);

const enhance = compose(
  pure,
  branch(() => Platform.OS === 'web', renderNothing),
  setPropTypes({
    titleText: PropTypes.string,
    backButton: PropTypes.bool,
  }),
);

const Header = enhance(({ titleText, backButton = false }) => (
  <HeaderContainer>
    <StatusBar barStyle="light-content" />
    <StyledHeaderBar>
      {backButton ? <BackButton /> : null}
      <StyledHeaderText>{titleText}</StyledHeaderText>
    </StyledHeaderBar>
  </HeaderContainer>
));

export default Header;
