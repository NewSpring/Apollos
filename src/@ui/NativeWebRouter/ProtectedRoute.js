import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Route, Redirect } from 'react-router';
import omit from 'lodash/omit';
import withUser from '@data/withUser/withIsLoggedIn';
import ActivityIndicator from '@ui/ActivityIndicator';
import BackgroundView from '@ui/BackgroundView';
import pickProps from '@utils/pickProps';

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

  render() {
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

          if (!this.props.isLoggedIn) {
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
