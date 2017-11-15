import React from 'react';
import { Text, View, StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setPropTypes, branch, renderNothing, pure } from 'recompose';
import SafeAreaView from '@primitives/SafeAreaView';
import withTheme from '@primitives/withTheme';
import styled from '@primitives/styled';

const StyledHeaderBar = styled({
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
})(View);

const StyledHeaderText = styled({
  color: 'white',
})(Text); // todo: use a different Text component that brings in correct styles

const enhance = compose(
  pure,
  branch(() => Platform.OS === 'web', renderNothing), // Header isn't a supported component on web
  withTheme(({ theme: { primaryColor } = {} }) => ({ primaryColor })),
  setPropTypes({
    titleText: PropTypes.string,
  }),
);

const Header = enhance(({ titleText, primaryColor }) => {
  const dynamicBackground = { backgroundColor: primaryColor };
  return (
    <SafeAreaView style={dynamicBackground}>
      <StatusBar barStyle="light-content" />
      <StyledHeaderBar>
        <StyledHeaderText>{titleText}</StyledHeaderText>
      </StyledHeaderBar>
    </SafeAreaView>
  );
});

export default Header;
