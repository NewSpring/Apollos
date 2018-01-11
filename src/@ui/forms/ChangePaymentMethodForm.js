import React, { PureComponent } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Yup from 'yup';
import { compose, mapProps } from 'recompose';
import get from 'lodash/get';
import Icon from '@ui/Icon';
import { withRouter } from '@ui/NativeWebRouter';
import Radio from '@ui/inputs/Radio';
import ErrorText from '@ui/inputs/ErrorText';
import Button, { ButtonLink } from '@ui/Button';
import withCheckout from '@data/withCheckout';
import ActivityIndicator from '@ui/ActivityIndicator';
import last4 from '@utils/last4';
import styled from '@ui/styled';

const Row = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 2,
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  paddingLeft: 10,
}))(View);

export class ChangePaymentMethodForm extends PureComponent {
  static propTypes = {
    isSubmitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleOnChange: PropTypes.func,
    errors: PropTypes.shape({
      general: PropTypes.string,
    }),
    values: PropTypes.shape({
      paymentMethod: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
    onPressNewPaymentMethod: PropTypes.func,
    savedPaymentMethods: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      name: PropTypes.string,
      paymentMethod: PropTypes.oneOf(['bankAccount', 'creditCard']),
      accountNumber: PropTypes.string,
    })),
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isSubmitting: false,
    handleSubmit() {},
    handleOnChange() {},
    errors: {},
    values: {},
    onPressNewPaymentMethod() {},
    savedPaymentMethods: [],
    isLoading: false,
  };

  render() {
    if (this.props.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        {this.props.errors.general && <ErrorText>{this.props.errors.general}</ErrorText>}
        <Radio
          onChange={this.props.handleOnChange}
          value={this.props.values.paymentMethod}
        >
          {this.props.savedPaymentMethods.map(paymentMethod => (
            <Radio.Button
              key={paymentMethod.id}
              value={paymentMethod.id}
              Label={() => (
                <Row>
                  <View>
                    <Text>{paymentMethod.name}</Text>
                    <Text>{`****${last4(paymentMethod.accountNumber)}`}</Text>
                  </View>
                  {paymentMethod.paymentMethod === 'creditCard' && <Icon name="credit" />}
                </Row>
              )}
            />
          ))}
        </Radio>

        <Button
          onPress={this.props.handleSubmit}
          title="Save and Continue"
          loading={this.props.isSubmitting}
        />

        <ButtonLink onPress={this.props.onPressNewPaymentMethod}>
          {'Enter New Payment'}
        </ButtonLink>
      </View>
    );
  }
}

const enhance = compose(
  withCheckout,
  withRouter,
  withFormik({
    mapPropsToValues: props => ({
      paymentMethod: get(props, 'savedPaymentMethods.0', {}).id,
    }),
    validationSchema: Yup.object().shape({
      paymentMethod: Yup.mixed().required(),
    }),
    enableReinitialize: true,
    handleSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(true);
        console.log('set payment method to saved', values);
      } catch (err) {
        setErrors({
          general: err.message,
        });
      } finally {
        setSubmitting(false);
      }
    },
  }),
  mapProps(props => ({
    ...props,
    handleOnChange(value) {
      return props.setFieldValue('paymentMethod', value);
    },
    onPressNewPaymentMethod() {
      return props.history.push('/give/checkout/personal');
    },
  })),
);

export default enhance(ChangePaymentMethodForm);

