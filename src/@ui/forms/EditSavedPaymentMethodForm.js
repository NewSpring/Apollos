import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { withFormik } from 'formik';
import Yup from 'yup';
import { compose, mapProps } from 'recompose';
import PropTypes from 'prop-types';
import { get, pick } from 'lodash';
import { H6 } from '@ui/typography';
import * as Inputs from '@ui/inputs';
import withSavedPaymentMethod from '@data/withSavedPaymentMethod';
import ActivityIndicator from '@ui/ActivityIndicator';
import Button from '@ui/Button';
import Icon from '@ui/Icon';
import Spacer from '@ui/Spacer';
import last4 from '@utils/last4';
import styled from '@ui/styled';
import PaddedView from '@ui/PaddedView';
import TableView, { FormFields } from '@ui/TableView';
import DeleteSavedPaymentMethodButton from './DeleteSavedPaymentMethodButton';

const Row = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 2,
  flexDirection: 'row',
  alignItems: 'center',
}))(View);

export class EditSavedPaymentMethodForm extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    accountNumber: PropTypes.string,
    accountType: PropTypes.oneOf(['bankAccount', 'creditCard']),
    values: PropTypes.shape({
      accountName: PropTypes.string,
    }),
    touched: PropTypes.shape({
      accountName: PropTypes.string,
    }),
    errors: PropTypes.shape({
      accountName: PropTypes.string,
    }),
    isLoading: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
  };

  static defaultProps = {
    accountNumber: '',
    accountType: '',
    values: {
      accountName: '',
    },
    touched: {
      accountName: false,
    },
    errors: {
      accountName: '',
    },
    isLoading: true,
    isSubmitting: false,
    isValid: false,
    handleSubmit() {},
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
        <PaddedView>
          <Row>
            {this.props.accountType === 'creditCard' && <Icon name="credit" />}
            <Spacer byWidth />
            <H6>{`****${last4(this.props.accountNumber)}`}</H6>
          </Row>
        </PaddedView>
        <TableView responsive={false}>
          <FormFields>
            <Inputs.Text
              label="Saved Account Name"
              value={this.props.values.accountName}
              onChangeText={text => this.props.setFieldValue('accountName', text)}
              onBlur={() => this.props.setFieldTouched('accountName', true)}
              error={this.props.touched.accountName && this.props.errors.accountName}
            />
          </FormFields>
        </TableView>
        <PaddedView>
          <Button
            onPress={this.props.handleSubmit}
            title="Save Changes"
            disabled={this.props.isSubmitting || !this.props.isValid}
            loading={this.props.isSubmitting}
          />
          <Spacer />
          <DeleteSavedPaymentMethodButton id={this.props.id} />
        </PaddedView>
      </View>
    );
  }
}

const mapPropsToValues = props => ({
  accountName: props.accountName,
});

const validationSchema = Yup.object().shape({
  accountName: Yup.string().required('Saved Account Name is a required field'),
});

const enhance = compose(
  withSavedPaymentMethod,
  mapProps(props => ({
    accountNumber: get(props, 'savedPaymentMethod.accountNumber', ''),
    accountType: get(props, 'savedPaymentMethod.paymentType', ''),
    accountName: get(props, 'savedPaymentMethod.name', ''),
    ...pick(props, ['isLoading', 'id', 'updateSavedPaymentMethod']),
  })),
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true,
    isInitialValid(props) {
      return validationSchema.isValidSync(mapPropsToValues(props));
    },
    handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
      try {
        setSubmitting(true);
        await props.updateSavedPaymentMethod({
          id: props.id,
          name: values.accountName,
        });
      } catch (e) {
        setErrors({
          accountName: e.message,
        });
      } finally {
        setSubmitting(false);
      }
    },
  }),
);

export default enhance(EditSavedPaymentMethodForm);
