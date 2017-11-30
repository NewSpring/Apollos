import React from 'react';
import { Text, View, StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setPropTypes, branch, renderNothing, pure } from 'recompose';
import SafeAreaView from '@primitives/SafeAreaView';
import styled from '@primitives/styled';

import BackButton from './BackButton';

const StyledHeaderBar = styled({
  height: 50,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
})(View);

const StyledSafeAreaView = styled(({ theme }) => ({
  backgroundColor: theme.primaryColor,
}))(SafeAreaView);

const StyledHeaderText = styled({
  color: 'white',
})(Text); // todo: use a different Text component that brings in correct styles

const enhance = compose(
  pure,
  branch(() => Platform.OS === 'web', renderNothing),
  setPropTypes({
    titleText: PropTypes.string,
    backButton: PropTypes.bool,
  }),
);

const Header = enhance(({ titleText, backButton = false }) => (
  <StyledSafeAreaView>
    <StatusBar barStyle="light-content" />
    <StyledHeaderBar>
      {backButton ? <BackButton /> : null}
      <StyledHeaderText>{titleText}</StyledHeaderText>
    </StyledHeaderBar>
  </StyledSafeAreaView>
));

export default Header;
