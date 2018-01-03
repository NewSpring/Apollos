import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Platform } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import { compose, withProps, withState, setPropTypes, defaultProps } from 'recompose';
import styled from '@ui/styled';

import TabBar from './TabBar';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const withStyles = styled({ flex: 1 }, 'TabView');

const defaultHeaderRenderer = props => <TabBar {...props} />;

const TabView = compose(
  setPropTypes({
    initialIndex: PropTypes.number,
    routes: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })).isRequired,
    renderScene: PropTypes.func.isRequired,
    renderHeader: PropTypes.func,
    swipeEnabled: PropTypes.bool,
  }),
  defaultProps({
    initialIndex: 0,
    renderHeader: defaultHeaderRenderer,
    swipeEnabled: Platform.OS !== 'web',
  }),
  withStyles,
  withState('index', 'onIndexChange', ({ initialIndex }) => initialIndex),
  withProps(({ index, routes }) => ({
    navigationState: { index, routes },
    initialLayout,
  })),
)(TabViewAnimated);

export { SceneMap, TabBar };
export default TabView;
