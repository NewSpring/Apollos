import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import authenticateMutation from './authenticateMutation';
import deauthorizeMutation from './deauthorizeMutation';
import personQuery from './personQuery';

// TODO: Set login token in local storage
const authenticateActions = graphql(authenticateMutation, {
  props: ({ mutate }) => ({
    login: ({ email, password } = {}) => (mutate({
      variables: {
        email,
        password,
      },
    })),
  }),
});

// TODO: Reset store on logout and remove token from local storage
const deauthorizeActions = graphql(deauthorizeMutation, {
  props: ({ mutate }) => ({
    logout: () => (mutate()),
  }),
});

const user = graphql(personQuery, {
  props: ({ data: { person } }) => ({
    user: person,
  }),
});

export default compose(
  authenticateActions,
  deauthorizeActions,
  user,
);
