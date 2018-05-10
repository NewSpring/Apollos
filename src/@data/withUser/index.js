import { compose } from 'recompose';
import withAddressState from './withAddressState';
import withLogin from './withLogin';
import withLogout from './withLogout';
import withRegister from './withRegister';
import withChangePassword from './withChangePassword';
import withForgotPassword from './withForgotPassword';
import withResetPassword from './withResetPassword';
import withUser from './withUser';
import withIsLoggedIn from './withIsLoggedIn';
import withUpdateHomeAddress from './withUpdateHomeAddress';
import withUpdateProfile from './withUpdateProfile';
import withAttachPhotoIdToUser from './withAttachPhotoIdToUser';

export default compose(
  withAddressState,
  withLogin,
  withLogout,
  withRegister,
  withChangePassword,
  withForgotPassword,
  withResetPassword,
  withIsLoggedIn,
  withUser,
  withUpdateHomeAddress,
  withUpdateProfile,
  withAttachPhotoIdToUser,
);
