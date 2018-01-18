import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import Client from '@data/Client';
import validateCard from './validateCard';
import createValidationOrder from './createValidationOrder';
import { QUERY as contributionsQuery } from './withContributions';

export default compose(
  createValidationOrder,
  validateCard,
  withProps(props => ({
    async validateSingleCardTransaction() {
      try {
        const { contributions: state } = Client.readQuery({
          query: contributionsQuery,
        });

        const r = await props.createValidationOrder();
        const order = get(r, 'data.order', {});

        const formData = new FormData();
        formData.append('billing-cc-number', state.creditCard.cardNumber);
        formData.append('billing-cc-exp', state.creditCard.expirationDate);
        formData.append('billing-cvv', state.creditCard.cvv);

        await fetch(order.url, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });

        const token = order.url.split('/').pop();
        const validationRes = await props.validateCard(token);
        const invalidCardError = get(validationRes, 'data.response.error');
        if (invalidCardError) throw new Error(invalidCardError);

        return true;
      } catch (err) {
        throw err;
      }
    },
  })),
);
