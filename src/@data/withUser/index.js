import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import authenticateMutation from './authenticateMutation';
import personQuery from './personQuery';
import signupMutation from './signupMutation';

// TODO: Set login token in local storage
const authenticateActions = graphql(authenticateMutation, {
  props: ({ mutate }) => ({
    login: ({ email, password } = {}) => {
      console.log('set email and password encrypted in local storage, have requests pick up on that for headers', {
        email,
        password,
      });
      return mutate();
    },
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
  signupActions,
  user,
);
