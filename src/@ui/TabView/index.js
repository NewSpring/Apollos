import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Platform } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import { compose, withProps, withState, setPropTypes, defaultProps } from 'recompose';
import isFunction from 'lodash/isFunction';
import { withThemeMixin } from '@ui/theme';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import styled from '@ui/styled';

import TabBar from './TabBar';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const withStyles = styled({ flex: 1 }, 'TabView');

const defaultHeaderRenderer = ({ barStyle = 'light-content' }) => (
  compose(
    withProps({ mobile: true }),
    mediaQuery(({ md }) => ({ minWidth: md }), withProps({ mobile: false })),
    withThemeMixin(({ theme, mobile }) => console.log({ mobile }) || ({
      colors: {
        text: {
          primary: (!mobile || barStyle === 'dark-content') ? theme.colors.darkPrimary : theme.colors.lightPrimary,
        },
        background: {
          primary: (mobile) ? theme.colors.background.primary : theme.colors.background.paper,
          secondary: (mobile) ? theme.colors.background.secondary : theme.colors.background.primary,
        },
      },
    })),
  )(props => <TabBar {...props} />)
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
    autoHeightEnabled: PropTypes.bool,
  }),
  defaultProps({
    initialIndex: 0,
    swipeEnabled: Platform.OS !== 'web',
    autoHeightEnabled: false,
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
