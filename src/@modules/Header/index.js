import React from 'react';
import { Text, View, StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setPropTypes, branch, renderNothing, pure } from 'recompose';
import SafeAreaView from '@primitives/SafeAreaView';
import styled from '@primitives/styled';

const StyledHeaderBar = styled({
  height: 50,
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
  }),
);

const Header = enhance(({ titleText = '' }) => (
  <StyledSafeAreaView>
    <StatusBar barStyle="light-content" />
    <StyledHeaderBar>
      <StyledHeaderText>{titleText}</StyledHeaderText>
    </StyledHeaderBar>
  </StyledSafeAreaView>
));

export default Header;
