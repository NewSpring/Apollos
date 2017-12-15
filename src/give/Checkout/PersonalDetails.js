import { compose, withProps } from 'recompose';
import withGive from '@data/withGive';
import { PersonalDetailsForm } from '@ui/forms';
import { withRouter } from '@ui/NativeWebRouter';

const PersonalDetails = compose(
  withGive,
  withRouter,
  withProps(({ setBillingPerson, history }) => ({
    onSubmit: (...args) => {
      setBillingPerson(...args).then(() => history.push('address'));
    },
  })),
)(PersonalDetailsForm);

export default PersonalDetails;
