import actionTypes from './actionTypes';

export const INITIAL_STATE = {
  isLoggedIn: false,
  loginToken: null,
  email: null,
  id: null,
  following: [],
  profile: {
    nickname: null,
    firstName: null,
    lastName: null,
    birthday: null,
    campus: null,
    address: {
      city: null,
      country: null,
      zip: null,
      state: null,
      street1: null,
      street2: null,
    },
    imageUrl: null,
    agreesOnTOS: null,
  },
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case actionTypes.CHECK_LOGIN_CREDENTIALS: {
      const {
        email,
      } = payload;
      return {
        ...state,
        email,
      };
    }
    case actionTypes.LOGIN: {
      const {
        loginToken,
        id,
      } = payload;
      return {
        ...state,
        isLoggedIn: true,
        loginToken,
        id,
      };
    }
    case actionTypes.LOGOUT: {
      return INITIAL_STATE;
    }
    case actionTypes.SIGNUP: {
      const {
        email,
        firstName,
        lastName,
        agreesOnTOS,
      } = payload;
      return {
        ...state,
        email,
        profile: {
          ...state.profile,
          firstName,
          lastName,
          agreesOnTOS,
        },
      };
    }
    default: {
      return state;
    }
  }
};
