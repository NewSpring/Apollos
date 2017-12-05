import React from 'react';
import { Text, View, StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setPropTypes, branch, renderNothing, pure } from 'recompose';
import SafeAreaView from '@ui/SafeAreaView';
import styled from '@ui/styled';

import BackButton from './BackButton';

const StyledHeaderBar = styled({
  height: 50,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}, 'Header.Bar')(View);

const HeaderContainer = styled(({ theme }) => ({
  backgroundColor: theme.colors.common.primary,
}), 'Header.Container')(SafeAreaView);

const StyledHeaderText = styled({
  color: 'white',
}, 'Header.Text')(Text); // todo: use a different Text component that brings in correct styles

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
