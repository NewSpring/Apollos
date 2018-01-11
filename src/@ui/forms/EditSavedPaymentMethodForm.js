import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import { withFormik } from 'formik';
import Yup from 'yup';
import { compose, mapProps } from 'recompose';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { H4, H6 } from '@ui/typography';
import * as Inputs from '@ui/inputs';
import { withRouter } from '@ui/NativeWebRouter';
import withSavedPaymentMethod from '@data/withSavedPaymentMethod';
import ActivityIndicator from '@ui/ActivityIndicator';
import Button from '@ui/Button';

export class EditSavedPaymentMethodForm extends PureComponent {
  static propTypes = {
    accountNumber: PropTypes.string,
    accountType: PropTypes.oneOf(['bankAccount', 'creditCard']),
    values: PropTypes.shape({
      accountName: PropTypes.string,
    }),
    isLoading: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  static defaultProps = {
    accountNumber: '',
    accountType: '',
    values: {
      accountName: '',
    },
    isLoading: true,
    isSubmitting: false,
    isValid: false,
    handleSubmit() {},
  };

  render() {
    console.log({ props: this.props });
    if (this.props.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <H4>{'Edit Account'}</H4>
        <H6>{`${this.props.accountNumber} - ${this.props.accountType}`}</H6>
        <Inputs.Text
          label="Saved Account Name"
          value={this.props.values.accountName}
        />
        <Button
          onPress={this.props.handleSubmit}
          title="Next"
          disabled={!this.props.isValid}
          loading={this.props.isSubmitting}
        />
      </View>
    );
  }
}

const mapPropsToValues = props => ({
  accountName: props.accountName,
});

const validationSchema = Yup.object().shape({
  accountName: Yup.string().required(),
});

const enhance = compose(
  withRouter,
  mapProps(props => ({
    id: props.match.params.id,
  })),
  withSavedPaymentMethod,
  mapProps(props => ({
    id: props.id,
    accountNumber: get(props, 'savedPaymentMethod.accountNumber', ''),
    accountType: get(props, 'savedPaymentMethod.paymentType', ''),
    accountName: get(props, 'savedPaymentMethod.name', ''),
    isLoading: props.isLoading,
  })),
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true,
    isInitialValid(props) {
      return validationSchema
        .validate(mapPropsToValues(props));
    },
    handleSubmit: (values, { props, setSubmitting }) => {
      try {
        setSubmitting(true);
        console.log('props.updateSavedPaymentMethodName', {
          id: props.id,
          name: values.accountName,
        });
      } catch (e) {
        console.log(e);
        // todo: If there's an error, we want to stay on this page and display it.
      } finally {
        setSubmitting(false);
      }
    },
  }),
);

export default enhance(EditSavedPaymentMethodForm);
