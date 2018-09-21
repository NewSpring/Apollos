import Sentry from '@utils/sentry';
import withUser from '@data/withUser/withUser';

const SentryContext = withUser(({ user: { id, email } = {}, children }) => {
  Sentry.setUserContext(id ? { id, email } : null);

  return children;
});

export default SentryContext;
