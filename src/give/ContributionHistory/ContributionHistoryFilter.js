import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import { withFormik } from 'formik';
import Yup from 'yup';
import TextInput from '@ui/inputs/Text';
import Button from '@ui/Button';

class ContributionHistoryFilter extends PureComponent {
  static propTypes = {
    values: PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
    touched: PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
    errors: PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
    handleSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
  };

  render() {
    return (
      <View>
        <TextInput
          label="Start Date"
          value={this.props.values.startDate}
          onChangeText={t => this.props.setFieldValue('startDate', t)}
          onBlur={() => this.props.setFieldTouched('startDate', true)}
          error={this.props.touched.startDate && this.props.errors.startDate}
        />
        <TextInput
          label="End Date"
          value={this.props.values.endDate}
          onChangeText={t => this.props.setFieldValue('endDate', t)}
          onBlur={() => this.props.setFieldTouched('endDate', true)}
          error={this.props.touched.endDate && this.props.errors.endDate}
        />
        <Button
          onPress={this.props.handleSubmit}
          title="Filter"
          loading={this.props.isSubmitting}
        />
      </View>
    );
  }
}

const enhance = withFormik({
  validationSchema: Yup.object().shape({
    startDate: Yup.string(),
    endDate: Yup.string(),
  }),
  handleSubmit: async (formValues, { props, setSubmitting }) => {
    try {
      setSubmitting(true);
      props.onSubmit(formValues);
      setSubmitting(false);
    } catch (e) {
      // TODO: If there's an error, we want to stay on this page and display it.
      console.log(e);
    }
  },
});

export default enhance(ContributionHistoryFilter);
