import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent } from 'recompose';
import withUser from '@data/withUser/withIsLoggedIn';
import { Route, Redirect } from 'react-router';
import ActivityIndicator from '@ui/ActivityIndicator';
import FlexedView from '@ui/FlexedView';

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
  <Route {...otherProps}>
    <FlexedView>
      <ActivityIndicator />
    </FlexedView>
  </Route>
);

ActivityIndicatorWhileLoading.propTypes = { ...Route.propTypes };

const ProtectedRoute = compose(
  withUser,
  branch(({ isLoading, isLoggedIn }) => isLoading && !isLoggedIn,
    renderComponent(ActivityIndicatorWhileLoading),
  ),
  branch(({ isLoggedIn }) => !isLoggedIn,
    renderComponent(RedirectWithReferrer),
  ),
)(Route);

export default ProtectedRoute;
