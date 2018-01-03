import { compose } from 'recompose';
import withAvailableTopics from './withAvailableTopics';
import withToggleTopic from './withToggleTopic';

export default compose(
  withAvailableTopics,
  withToggleTopic,
);
