import { UPDATE_USER_PROFILE } from '../actionTypes';

export default function updateProfile(params = { address: {} }) {
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
    type: UPDATE_USER_PROFILE,
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
