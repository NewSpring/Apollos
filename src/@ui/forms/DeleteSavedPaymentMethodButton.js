import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { withFormik } from 'formik';
import { compose, mapProps } from 'recompose';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { withRouter, goBackTo } from '@ui/NativeWebRouter';
import withSavedPaymentMethod from '@data/withSavedPaymentMethod';
import ActivityIndicator from '@ui/ActivityIndicator';
import Button from '@ui/Button';

export class DeleteSavedPaymentMethodButton extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  static defaultProps = {
    isLoading: true,
    isSubmitting: false,
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
      <Button
        onPress={this.props.handleSubmit}
        title="Delete Account"
        disable={this.props.isSubmitting}
        loading={this.props.isSubmitting}
        type="alert"
        bordered
      />
    );
  }
}

const enhance = compose(
  withRouter,
  withSavedPaymentMethod,
  mapProps(props => (
    pick(props, [
      'isLoading',
      'id',
      'removeSavedPaymentMethod',
      'history',
    ])
  )),
  withFormik({
    handleSubmit: async (values, { props, setSubmitting }) => {
      try {
        setSubmitting(true);
        await props.removeSavedPaymentMethod(props.id);
        goBackTo({ to: '/give', history: props.history, replace: true });
      } catch (err) {
        // Ignore
      } finally {
        setSubmitting(false);
      }
    },
  }),
);

export default enhance(DeleteSavedPaymentMethodButton);
