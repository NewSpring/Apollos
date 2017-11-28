import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, branch, renderComponent } from 'recompose';
import { View, ScrollView } from 'react-native';
import ActivityIndicator from '@primitives/ActivityIndicator';
import styled from '@primitives/styled';
import NavItem from './NavItem';

const FlexedChildren = styled(({ theme }) => ({
  paddingRight: theme.baseUnit / 2,
  paddingBottom: theme.baseUnit / 2,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
}))(View);

const FlexedChild = styled(({ theme }) => ({
  width: '50%',
  paddingLeft: theme.baseUnit / 2,
  paddingTop: theme.baseUnit / 2,
}))(View);

const enhance = compose(
  pure,
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
);

const TileNav = enhance(({ navigation }) => console.log({ navigation }) || (
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
