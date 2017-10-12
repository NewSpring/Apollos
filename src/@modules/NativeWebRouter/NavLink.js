/* eslint-disable react/forbid-prop-types, react/no-children-prop */
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import Link from './Link';

export default class NavLink extends Component {
  static propTypes = {
    to: Link.propTypes.to,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    location: PropTypes.object,
    activeStyle: PropTypes.object,
    style: PropTypes.object,
    isActive: PropTypes.func,
    onPress: Link.propTypes.onPress,
    component: Link.propTypes.component,
    replace: Link.propTypes.replace,
    children: PropTypes.node,
  };

  static defaultProps = {
    to: Link.defaultProps.to,
    exact: null,
    strict: null,
    location: null,
    activeStyle: null,
    style: null,
    isActive: null,
    onPress: Link.defaultProps.onPress,
    component: Link.defaultProps.component,
    replace: Link.defaultProps.replace,
    children: null,
  };

  render() {
    const {
      to,
      exact,
      strict,
      isActive: getIsActive,
      style,
      activeStyle,
      children,
      onPress,
      component,
      replace,
      ...rest
    } = this.props;

    const path = typeof to === 'object' ? to.pathname : to;
    // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
    const escapedPath = path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

    return (
      <Route
        path={escapedPath}
        exact={exact}
        strict={strict}
        location={this.props.location}
        children={({ location, match }) => {
          const isActive = !!(getIsActive ? getIsActive(match, location) : match);

          return (
            <Link
              to={to}
              onPress={onPress}
              component={component}
              replace={replace}
            >
              <View
                style={isActive ? activeStyle : style}
                {...rest}
              >
                {children}
              </View>
            </Link>
          );
        }}
      />
    );
  }
}
