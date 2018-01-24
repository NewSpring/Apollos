import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent } from 'recompose';
import withUser from '@data/withUser/withIsLoggedIn';
import { Route, Redirect } from 'react-router';
import ActivityIndicator from '@ui/ActivityIndicator';

const RedirectWithReferrer = ({ path }) => (
  <Redirect
    from={path}
    to={{
      pathname: '/login',
      state: { referrer: path },
    }}
  />
);

RedirectWithReferrer.propTypes = { path: PropTypes.string };

const ActivityIndicatorWhileLoading = ({
  render,
  component,
  children,
  ...otherProps
}) => (
  <Route {...otherProps} component={ActivityIndicator} />
);

ActivityIndicatorWhileLoading.propTypes = { ...Route.propTypes };

const ProtectedRoute = compose(
  withUser,
  branch(({ isLoading, user }) => isLoading && !user,
    renderComponent(ActivityIndicatorWhileLoading),
  ),
  branch(({ isLoggedIn }) => !isLoggedIn,
    renderComponent(RedirectWithReferrer),
  ),
)(Route);

export default ProtectedRoute;
