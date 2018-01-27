import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'react-native-tab-view';
import { compose, withProps } from 'recompose';
import {
  View,
  Platform,
} from 'react-native';
import Header from '@ui/Header';
import { H2 } from '@ui/typography';
import Spacer from '@ui/Spacer';
import Label from '@ui/TabView/TabBar/Label';
import styled from '@ui/styled';
import { withTheme } from '@ui/theme';

const withTabBarStyles = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.default,
}));

const StyledTabBar = compose(
  withTheme(),
  withProps(({ theme }) => ({
    renderLabel: Label,
    indicatorStyle: {
      backgroundColor: theme.colors.primary,
    },
  })),
  withTabBarStyles,
)(TabBar);

const StyledHeader = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.default,
}))(View);

const StyledH2 = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
  paddingHorizontal: theme.sizing.baseUnit,
  color: theme.colors.darkSecondary,
}))(H2);

function GiveHeader(props) {
  return (
    <StyledHeader>
      <Header backButton titleText={props.headerTitle} />
      {Platform.OS === 'web' && (
        <StyledH2>{props.webHeaderTitle || props.headerTitle}</StyledH2>
      )}
      <Spacer />
      <StyledTabBar {...props} />
    </StyledHeader>
  );
}

GiveHeader.propTypes = {
  headerTitle: PropTypes.string,
  webHeaderTitle: PropTypes.string,
};

GiveHeader.defaultProps = {
  headerTitle: 'Give',
  webHeaderTitle: null,
};

export default GiveHeader;
