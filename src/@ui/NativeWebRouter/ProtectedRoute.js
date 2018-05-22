import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Route, Redirect } from 'react-router';
import omit from 'lodash/omit';
import get from 'lodash/get';
import withUser from '@data/withUser/withIsLoggedIn';
import ActivityIndicator from '@ui/ActivityIndicator';
import BackgroundView from '@ui/BackgroundView';
import pickProps from '@utils/pickProps';

import matchLocationToPath from './matchLocationToPath';

const enhance = compose(
  withUser,
  // NOTE: This removes all the props noise
  pickProps([...Object.keys(Route.propTypes), 'isLoggedIn', 'isLoading']),
);

export const isEmptyChildren = children => React.Children.count(children) === 0;

class ProtectedRoute extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    ...Route.propTypes,
  };

  static defaultProps = {
    isLoading: true,
    isLoggedIn: false,
    ...Route.defaultProps,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object,
    }),
  };

  render() {
    const currentPath = get(this.context, 'router.history.location.pathname');
    return (
      <Route
        {...omit(this.props, ['render', 'children', 'component'])}
        render={(matchProps) => {
          if (this.props.isLoading && !this.props.isLoggedIn) {
            return (
              <BackgroundView>
                <ActivityIndicator />
              </BackgroundView>
            );
          }

          const currentPathMatchesProtectedRoute = matchLocationToPath(
            currentPath,
            { pathname: this.props.path },
          );

          if (!this.props.isLoggedIn && currentPathMatchesProtectedRoute) {
            return (
              <Redirect
                from={this.props.path}
                to={{
                  pathname: '/login',
                  state: { referrer: this.props.path },
                }}
              />
            );
          }

          if (this.props.component) return React.createElement(this.props.component, matchProps);

          if (this.props.render) return this.props.render(matchProps);

          if (typeof this.props.children === 'function') return this.props.children(matchProps);

          if (this.props.children && !isEmptyChildren(this.props.children)) {
            return React.Children.only(this.props.children);
          }

          return null;
        }}
      />
    );
  }
}

export default enhance(ProtectedRoute);
