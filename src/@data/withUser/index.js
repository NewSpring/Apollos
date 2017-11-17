import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import authenticateMutation from './authenticateMutation';
import deauthorizeMutation from './deauthorizeMutation';
import personQuery from './personQuery';
import hashPassword from './hashPassword';
import signupMutation from './signupMutation';

// TODO: Set login token in local storage
const authenticateActions = graphql(authenticateMutation, {
  props: ({ mutate }) => ({
    login: ({ email, password } = {}) => (mutate({
      variables: {
        email,
        password: hashPassword(password),
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

const signupActions = graphql(signupMutation, {
  props: ({ mutate }) => ({
    login: (params = {}) => {
      const {
        email,
        password,
        firstName,
        lastName,
      } = params;

      mutate({
        variables: {
          email,
          password,
          firstName,
          lastName,
        },
      });
    },
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
  signupActions,
  user,
);
