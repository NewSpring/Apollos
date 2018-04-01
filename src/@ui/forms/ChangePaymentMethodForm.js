import React, { PureComponent } from 'react';
import { View } from 'react-native';
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
import withGive from '@data/withGive';
import ActivityIndicator from '@ui/ActivityIndicator';
import last4 from '@utils/last4';
import styled from '@ui/styled';
import PaddedView from '@ui/PaddedView';
import TableView, { Divider } from '@ui/TableView';
import { H6, H7 } from '@ui/typography';

const Row = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit / 2,
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
}))(View);

const ButtonLinkWrapper = styled(({ theme }) => ({
  alignItems: 'center',
  paddingTop: theme.sizing.baseUnit,
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
      paymentMethod: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    onPressNewPaymentMethod: PropTypes.func,
    savedPaymentMethods: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        name: PropTypes.string,
        paymentMethod: PropTypes.oneOf(['bankAccount', 'creditCard']),
        accountNumber: PropTypes.string,
      }),
    ),
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
        <TableView>
          <Radio onChange={this.props.handleOnChange} value={this.props.values.paymentMethod}>
            {this.props.savedPaymentMethods.map((paymentMethod, i) => [
              <Radio.Button
                key={paymentMethod.id}
                value={paymentMethod.id}
                Label={() => (
                  <Row>
                    <View>
                      <H6>{paymentMethod.name}</H6>
                      <H7>{`****${last4(paymentMethod.accountNumber)}`}</H7>
                    </View>
                    {paymentMethod.paymentMethod === 'creditCard' ? <Icon name="credit" /> : <Icon name="bank" />}
                  </Row>
                )}
              />,
              i !== this.props.savedPaymentMethods.length - 1 ? <Divider key="divider" /> : null,
            ])}
          </Radio>
        </TableView>
        <PaddedView>
          <Button
            onPress={this.props.handleSubmit}
            title="Save and Continue"
            loading={this.props.isSubmitting}
          />
          <ButtonLinkWrapper>
            <ButtonLink onPress={this.props.onPressNewPaymentMethod}>
              {'Enter New Payment'}
            </ButtonLink>
          </ButtonLinkWrapper>
        </PaddedView>
      </View>
    );
  }
}

const enhance = compose(
  withCheckout,
  withGive,
  withRouter,
  withFormik({
    mapPropsToValues: props => ({
      paymentMethod:
        get(props, 'contributions.savedPaymentMethodId') || get(props, 'savedPaymentMethods.0.id'),
    }),
    validationSchema: Yup.object().shape({
      paymentMethod: Yup.mixed().required('Payment method is a required field'),
    }),
    enableReinitialize: true,
    handleSubmit: async (values, { setSubmitting, setErrors, props }) => {
      let shouldRedirect = false;
      try {
        setSubmitting(true);
        props.setSavedPaymentMethod(values.paymentMethod);
        shouldRedirect = true;
      } catch (err) {
        setErrors({
          general: err.message,
        });
      } finally {
        setSubmitting(false);
      }
      if (shouldRedirect) props.history.push('/give/checkout/confirm');
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
