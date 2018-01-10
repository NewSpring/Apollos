import React, { PureComponent } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Yup from 'yup';
import { compose, mapProps } from 'recompose';
import { withRouter } from '@ui/NativeWebRouter';
import Radio from '@ui/inputs/Radio';
import ErrorText from '@ui/inputs/ErrorText';
import Button, { ButtonLink } from '@ui/Button';

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
  };

  static defaultProps = {
    isSubmitting: false,
    handleSubmit() {},
    handleOnChange() {},
    errors: {},
    values: {},
    onPressNewPaymentMethod() {},
  };

  render() {
    return (
      <View>
        {this.props.errors.general && <ErrorText>{this.props.errors.general}</ErrorText>}
        <Radio
          onChange={this.props.handleOnChange}
          initialValue={this.props.values.paymentMethod}
        >
          <Radio.Button
            value="1"
            Label={() => (
              <View>
                <Text>{'stuff!'}</Text>
              </View>
            )}
          />
          <Radio.Button
            value="2"
            Label="two"
          />
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

export default compose(
  withFormik({
    mapPropsToValues: () => ({
      paymentMethod: '1',
    }),
    validationSchema: Yup.object().shape({
      paymentMethod: Yup.mixed().required(),
    }),
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
  withRouter,
  mapProps(props => ({
    ...props,
    handleOnChange(value) {
      return props.setFieldValue('paymentMethod', value);
    },
    onPressNewPaymentMethod() {
      props.history.push('/give/checkout/personal');
    },
  })),
)(ChangePaymentMethodForm);

