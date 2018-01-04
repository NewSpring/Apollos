import { withApollo } from 'react-apollo';
import { mapProps, compose } from 'recompose';
import { get } from 'lodash';
import { QUERY } from '@data/withUser/withUser';
import { withRouter } from 'react-router';

const authPromiseForClient = ({ history, location, client }) => async (next) => {
  const result = await client.query({ query: QUERY });
  const user = get(result, 'data.person');
  if (!user || !user.id) {
    history.push({
      pathname: '/login',
      state: { referrer: location.pathname, authCallback: next },
    });
  } else {
    next(user);
  }
};

/**
 * HOC that allows you to pass in functions into a component
 * that run only after a user logs in (and prompts for user login if needed)
 * Usage:
 * withProtectedFunction((protect, ownProps) => ({
 *   protectedFunction: protect(ownProps.someFunctionIWantToSecure),
 * }))(MyComponent);
 *
 * See @data/likes/withToggleLike.js for a real example
 */
const withProtectedFunction = input => compose(
  mapProps(props => ({ ownProps: props })),
  withRouter,
  withApollo,
  mapProps(({ ownProps, ...hocProps }) => ({
    ...ownProps,
    ...input(authPromiseForClient(hocProps), ownProps),
  })),
);

export default withProtectedFunction;
