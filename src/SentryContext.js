import Sentry from '@utils/sentry';
import withUser from '@data/withUser/withUser';

const SentryContext = withUser(({ user, children }) => {
  Sentry.setUserContext(user);
  return children;
});

export default SentryContext;
