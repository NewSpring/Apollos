import { compose } from 'recompose';
import { get } from 'lodash';
import { withFormik } from 'formik';
import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import { BillingAddressForm } from '@ui/forms';
import { withRouter } from '@ui/NativeWebRouter';

const BillingAddress = compose(
  withGive,
  withCheckout,
  withRouter,
  withFormik({
    mapPropsToValues: props => ({
      street1: get(props, 'person.home.street1'),
      street2: get(props, 'person.home.street2'),
      city: get(props, 'person.home.city'),
      stateId: get(props, 'person.home.state') || 'SC',
      countryId: get(props, 'person.home.country') || 'US',
      zipCode: get(props, 'person.home.zip'),
    }),
    handleSubmit: async (formValues, { props }) => {
      try {
        props.setBillingAddress(formValues);
        const createOrderResponse = await props.createOrder();
        const order = get(createOrderResponse, 'data.order', {});
        props.setOrder({
          url: order.url,
        });
        props.history.replace('payment');
      } catch (e) {
        // todo: If there's an error, we want to stay on this page and display it.
      }
    },
  }),
)(BillingAddressForm);

export default BillingAddress;
