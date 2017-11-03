import { SET_USER_PROFILE } from '../actionTypes';

export default function setUserProfile(params = { address: {} }) {
  const {
    nickname,
    firstName,
    lastName,
    email,
    birthday,
    campus,
    address: {
      city,
      country,
      zip,
      state,
      street1,
      street2,
    },
    imageUrl,
  } = params;

  return {
    type: SET_USER_PROFILE,
    payload: {
      nickname,
      firstName,
      lastName,
      email,
      birthday,
      campus,
      address: {
        city,
        country,
        zip,
        state,
        street1,
        street2,
      },
      imageUrl,
    },
  };
}
