import { compose, withProps } from 'recompose';
import { get } from 'lodash';
import withGive from '@data/withGive';
import { BillingAddressForm } from '@ui/forms';
import { withRouter } from '@ui/NativeWebRouter';

const BillingAddress = compose(
  withGive,
  withRouter,
  withProps(props => ({
    onSubmit: async (formValues) => {
      try {
        props.setBillingAddress(formValues);
        const createOrderResponse = await props.createOrder();
        const order = get(createOrderResponse, 'data.order', {});
        props.setOrder({
          url: order.url,
        });
        props.history.push('payment');
      } catch (e) {
        // todo: If there's an error, we want to stay on this page and display it.
      }
    },
  })),
)(BillingAddressForm);

export default BillingAddress;
