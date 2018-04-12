import { get } from 'lodash';
import Sentry from '@utils/sentry';
import Analytics from '@utils/analytics';
import withUser from '@data/withUser/withUser';

const SentryContext = withUser(({
  user: {
    id,
    email,
    age,
    campus = {},
    home = {},
    groups = [],
    followedTopics,
  } = {},
  children,
}) => {
  Sentry.setUserContext(id ? { id, email } : null);

  if (!id) {
    Analytics.identify(null);
  } else {
    Analytics.identify(id, {
      age,
      campusId: get(campus, 'id'),
      campusName: get(campus, 'name'),
      homeCity: get(home, 'city'),
      homeState: get(home, 'state'),
      homeCountry: get(home, 'country'),
      numberOfGroups: get(groups, 'length'),
      followedTopics,
    });
  }

  return children;
});

export default SentryContext;
