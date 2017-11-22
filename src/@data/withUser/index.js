import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import personQuery from './personQuery';
import loginMutation from './loginMutation';
import registerMutation from './registerMutation';
import changePasswordMutation from './changePasswordMutation';
import forgotPasswordMutation from './forgotPasswordMutation';
import resetPasswordMutation from './resetPasswordMutation';

// TODO: Set login token in local storage
const loginAction = graphql(loginMutation, {
  props: ({ mutate }) => ({
    login: ({ email, password } = {}) => {
      console.log('set email and password encrypted in local storage, have requests pick up on that for headers', {
        email,
        password,
      });
      return mutate({
        variables: {
          email,
          password,
        },
      });
    },
  }),
});

const registerAction = graphql(registerMutation, {
  props: ({ mutate }) => ({
    register: (params = {}) => {
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

const changePasswordAction = graphql(changePasswordMutation, {
  props: ({ mutate }) => ({
    changePassword: (params = {}) => {
      const {
        oldPassword,
        newPassword,
      } = params;

      mutate({
        variables: {
          oldPassword,
          newPassword,
        },
      });
    },
  }),
});

const forgotPasswordAction = graphql(forgotPasswordMutation, {
  props: ({ mutate }) => ({
    forgotPassword: (params = {}) => {
      const {
        email,
        sourceURL,
      } = params;

      mutate({
        variables: {
          email,
          sourceURL,
        },
      });
    },
  }),
});

const resetPasswordAction = graphql(resetPasswordMutation, {
  props: ({ mutate }) => ({
    resetPassword: (params = {}) => {
      const {
        token,
        newPassword,
      } = params;

      mutate({
        variables: {
          token,
          newPassword,
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
  loginAction,
  registerAction,
  changePasswordAction,
  forgotPasswordAction,
  resetPasswordAction,
  user,
);
