import Sentry from '@utils/sentry';
import Analytics from '@utils/analytics';
import withUser from '@data/withUser/withUser';

const SentryContext = withUser(({ user: { id, email } = {}, children }) => {
  Sentry.setUserContext(id ? { id, email } : null);

  if (id) {
    Analytics.identify(id);
  }

  return children;
});

export default SentryContext;
