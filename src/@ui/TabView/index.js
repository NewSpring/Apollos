import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Platform } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import { compose, withProps, withState, setPropTypes, defaultProps } from 'recompose';
import isFunction from 'lodash/isFunction';
import { withThemeMixin } from '@ui/theme';
import styled from '@ui/styled';

import TabBar from './TabBar';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const withStyles = styled({ flex: 1 }, 'TabView');

const defaultHeaderRenderer = ({ barStyle }) => (
  withThemeMixin(({ theme }) => ({
    colors: {
      ...theme.colors,
      text: {
        ...theme.colors.text,
        primary: barStyle === 'dark-content' ? theme.colors.darkPrimary : theme.colors.lightPrimary,
      },
    },
  }))(props => <TabBar {...props} />)
);

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
    swipeEnabled: Platform.OS !== 'web',
  }),
  withStyles,
  withState('index', 'onIndexChange', ({ initialIndex }) => initialIndex),
  withProps((props) => {
    function onIndexChange(index) {
      props.onIndexChange(index);
      if (isFunction(props.onChange)) props.onChange(index);
    }

    return ({
      navigationState: {
        index: props.index,
        routes: props.routes.map(routeProps => ({
          ...routeProps,
          jumpTo(key) {
            const index = props.routes.findIndex(r => (r.key === key));
            return props.onIndexChange(index);
          },
        })),
      },
      initialLayout,
      renderHeader: props.renderHeader ? props.renderHeader : defaultHeaderRenderer(props),
      onIndexChange,
    });
  }),
)(TabViewAnimated);


export { SceneMap, TabBar };
export default TabView;
