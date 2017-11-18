import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, branch, renderComponent, mapProps } from 'recompose';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import styled from '@primitives/styled';
import NavItem from './NavItem';

const FlexedChildren = styled(({ theme }) => ({
  paddingRight: theme.baseUnit / 2,
  paddingBottom: theme.baseUnit / 2,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
}))(View);

const CenteredActivityIndicator = styled({ // todo: change to a better empty/loading state
  flex: 1,
  alignSelf: 'center',
  ...StyleSheet.absolutePositionObject,
})(ActivityIndicator);

const FlexedChild = styled(({ theme }) => ({
  width: '50%',
  paddingLeft: theme.baseUnit / 2,
  paddingTop: theme.baseUnit / 2,
}))(View);

const enhance = compose(
  pure,
  branch(({ isLoading }) => isLoading, renderComponent(mapProps({}, CenteredActivityIndicator))),
);

const TileNav = enhance(({ navigation }) => (
  <ScrollView>
    <FlexedChildren>
      {navigation.map(item => <FlexedChild><NavItem {...item} key={item.link} /></FlexedChild>)}
    </FlexedChildren>
  </ScrollView>
));

TileNav.propTypes = {
  navigation: PropTypes.arrayOf(PropTypes.shape({
    ...NavItem.propTypes,
  })),
};

export default TileNav;
