import { compose } from 'recompose';
import { withFormik } from 'formik';
import { get } from 'lodash';

import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import { PersonalDetailsForm } from '@ui/forms';
import { withRouter } from '@ui/NativeWebRouter';


const PersonalDetails = compose(
  withGive,
  withCheckout,
  withRouter,
  withFormik({
    mapPropsToValues: props => ({
      firstName: get(props, 'person.firstName'),
      lastName: get(props, 'person.lastName'),
      email: get(props, 'person.email'),
      campusId: get(props, 'person.campus.id') || get(props, 'campuses.0.id'),
    }),
    handleSubmit: (values, { props }) => {
      props.setBillingPerson(values).then(() => props.history.replace('address'));
    },
  }),
)(PersonalDetailsForm);

export default PersonalDetails;
