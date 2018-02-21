import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import SafeAreaView from '@ui/SafeAreaView';
import PropTypes from 'prop-types';
import { compose, setPropTypes, pure, branch, renderNothing, defaultProps } from 'recompose';
import { withTheme, withThemeMixin } from '@ui/theme';
import styled from '@ui/styled';
import { H2, H6 } from '@ui/typography';

import BackButton from './BackButton';

const StyledHeaderBar = styled(
  ({ theme }) => ({
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
    paddingHorizontal: theme.sizing.baseUnit / 2,
    ...Platform.select({
      web: {
        height: undefined,
        paddingHorizontal: theme.sizing.baseUnit,
        paddingVertical: theme.sizing.baseUnit,
        paddingTop: theme.sizing.baseUnit * 2.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
    }),
  }),
  'Header.Bar',
)(View);

const HeaderContainer = styled(
  ({ theme, backgroundColor }) => ({
    backgroundColor: backgroundColor || theme.colors.background.primary,
    ...Platform.select({
      android: {
        // paddingTop: 25, // todo: this is currently required as SafeAreaView isn't
        // properly adding padding on android.
      },
      web: {
        backgroundColor: theme.colors.background.paper,
      },
    }),
  }),
  'Header.Container',
)(SafeAreaView);

const WebHeaderText = styled(
  ({ theme }) => ({
    color: theme.colors.darkSecondary,
  }),
  'Header.WebHeaderText',
)(H2);

const StyledHeaderText =
  Platform.OS === 'web'
    ? WebHeaderText
    : styled(
      ({ theme, barStyle }) => ({
        color: barStyle === 'dark-content' ? theme.colors.darkPrimary : theme.colors.lightPrimary,
        maxWidth: '80%',
      }),
      'Header.Text',
    )(H6);

const RightContainer = styled(
  ({ theme }) => ({
    position: 'absolute',
    right: 4,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    ...Platform.select({
      web: {
        right: theme.sizing.baseUnit,
        top: theme.sizing.baseUnit,
        justifyContent: 'flex-start',
      },
    }),
  }),
  'Header.RightContainer',
)(View);

const ColoredBackButton = compose(
  pure,
  withTheme(({ theme, barstyle }) => ({
    color: barstyle === 'dark-content' ? theme.colors.darkPrimary : undefined,
  })),
)(BackButton);

const enhance = compose(
  defaultProps({
    backButton: false,
    barStyle: 'light-content',
    children: null,
  }),
  setPropTypes({
    webEnabled: PropTypes.bool,
    titleText: PropTypes.string,
    backButton: PropTypes.bool,
    barStyle: PropTypes.oneOf(['light-content', 'dark-content']),
    children: PropTypes.node,
  }),
  branch(({ webEnabled }) => !webEnabled && Platform.OS === 'web', renderNothing),
  branch(
    () => Platform.OS !== 'web',
    withThemeMixin(({ theme, barStyle }) => ({
      type: barStyle === 'light-content' ? 'dark' : 'light',
      colors: {
        background: {
          ...theme.colors.background,
          default: theme.colors.background.primary,
        },
      },
    })),
  ),
  pure,
);

const Header = enhance(
  ({
    titleText,
    right,
    backButton = false,
    barStyle = 'light-content',
    style = {},
    backgroundColor = null,
    children,
  }) => (
    <HeaderContainer backgroundColor={backgroundColor} style={style}>
      <StatusBar barStyle={barStyle} />
      <StyledHeaderBar>
        {backButton ? <ColoredBackButton barStyle={barStyle} /> : null}
        {titleText ? (
          <StyledHeaderText barStyle={barStyle} numberOfLines={1}>
            {titleText}
          </StyledHeaderText>
        ) : null}
        {children}
        {right ? <RightContainer>{right}</RightContainer> : null}
      </StyledHeaderBar>
    </HeaderContainer>
  ),
);

export default Header;
