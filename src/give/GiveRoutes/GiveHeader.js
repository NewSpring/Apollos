import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'react-native-tab-view';
import { compose, withProps } from 'recompose';
import {
  View,
  Platform,
} from 'react-native';
import Header from '@ui/Header';
import Label from '@ui/TabView/TabBar/Label';
import styled from '@ui/styled';
import { withTheme } from '@ui/theme';

const withTabBarStyles = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
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

function GiveHeader(props) {
  let { headerTitle } = props;
  if (Platform.OS === 'web' && props.webHeaderTitle) headerTitle = props.webHeaderTitle;
  return (
    <StyledHeader>
      <Header
        webEnabled
        backButton={Platform.OS !== 'web'}
        titleText={headerTitle}
      />
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
