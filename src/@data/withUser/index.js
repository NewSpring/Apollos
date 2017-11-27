import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import {
  AsyncStorage,
} from 'react-native';
import personQuery from './personQuery';
import loginMutation from './loginMutation';
import registerMutation from './registerMutation';
import changePasswordMutation from './changePasswordMutation';
import forgotPasswordMutation from './forgotPasswordMutation';
import resetPasswordMutation from './resetPasswordMutation';

// TODO: Set login token in local storage
const loginAction = graphql(loginMutation, {
  props: ({ mutate }) => ({
    login: async ({ email, password } = {}) => {
      try {
        const result = await mutate({
          variables: {
            email,
            password,
          },
        });

        await AsyncStorage.setItem('authToken', `${btoa(email)}::${btoa(password)}`);
        return result;
      } catch (err) {
        throw err;
      }
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
