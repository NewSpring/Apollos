import * as actionTypes from './actionTypes';

export const INITIAL_STATE = {
  isLoading: true,
  isLoggedIn: false,
  loginToken: null,
  email: null,
  id: null,
  following: [],
  profile: {
    isLoading: true,
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
    case actionTypes.GET_USER_PROFILE: {
      return {
        ...state,
        profile: {
          ...state.profile,
          isLoading: true,
        },
      };
    }
    case actionTypes.SET_USER_PROFILE: {
      const {
        nickname,
        firstName,
        lastName,
        birthday,
        campus,
        address: {
          city,
          country,
          zip,
          state: addressState,
          street1,
          street2,
        },
        imageUrl,
        agreesOnTOS,
      } = payload;

      return {
        ...state,
        profile: {
          ...state.profile,
          isLoading: true,
          nickname,
          firstName,
          lastName,
          birthday,
          campus,
          address: {
            city,
            country,
            zip,
            state: addressState,
            street1,
            street2,
          },
          imageUrl,
          agreesOnTOS,
        },
      };
    }
    case actionTypes.GET_CURRENT_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.SET_CURRENT_USER: {
      const {
        loginToken,
        email,
        id,
      } = payload;

      return {
        ...state,
        isLoading: false,
        loginToken,
        email,
        id,
      };
    }
    default: {
      return state;
    }
  }
};
