import { compose } from 'recompose';
import withLogin from './withLogin';
import withLogout from './withLogout';
import withRegister from './withRegister';
import withChangePassword from './withChangePassword';
import withForgotPassword from './withForgotPassword';
import withResetPassword from './withResetPassword';
import withUser from './withUser';
import withIsLoggedIn from './withIsLoggedIn';

export default compose(
  withLogin,
  withLogout,
  withRegister,
  withChangePassword,
  withForgotPassword,
  withResetPassword,
  withIsLoggedIn,
  withUser,
);
