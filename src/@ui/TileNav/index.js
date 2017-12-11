import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, branch, renderComponent } from 'recompose';
import { View, ScrollView } from 'react-native';
import ActivityIndicator from '@ui/ActivityIndicator';
import styled from '@ui/styled';
import NavItem from './NavItem';

const FlexedChildren = styled(({ theme }) => ({
  paddingRight: theme.sizing.baseUnit / 2,
  paddingBottom: theme.sizing.baseUnit / 2,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
}), 'TileNav.Children')(View);

const FlexedChild = styled(({ theme }) => ({
  width: '50%',
  paddingLeft: theme.sizing.baseUnit / 2,
  paddingTop: theme.sizing.baseUnit / 2,
}), 'TileNav.Child')(View);

const enhance = compose(
  pure,
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
);

const TileNav = enhance(({ navigation }) => (
  <ScrollView>
    <FlexedChildren>
      {navigation.map(item => <FlexedChild key={item.link}><NavItem {...item} /></FlexedChild>)}
    </FlexedChildren>
  </ScrollView>
));

TileNav.propTypes = {
  navigation: PropTypes.arrayOf(PropTypes.shape({
    ...NavItem.propTypes,
  })),
};

export default TileNav;
