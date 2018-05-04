// When forms update values, the entire form re-renders.
// We also pass setter functions to our input elements.
// Generally, these are anonymous arrow functions, which makes these input
// elements in-pure, and so they also re-render. This causes glaring
// performance issue. This exposes a higher-order function to provide
// pure functions to your form's input components.
import React, { Component } from 'react';

const createSetter = (getSetter, name) => (WrapperComponent) => {
  class FormikSetter extends Component {
    setters = {};

    getSetter = (fieldName) => {
      if (!this.setters[fieldName]) {
        this.setters[fieldName] = getSetter(fieldName, { ...this.props });
      }
      return this.setters[fieldName];
    }

    render() {
      const setterProp = { [name]: this.getSetter };
      return <WrapperComponent {...this.props} {...setterProp} />;
    }
  }
  return FormikSetter;
};

// withVieldValueSetter
// usage:
/**
  const MyForm = compose(
    formik(...),
    withFieldValueSetter,
  )(({ fieldValueSetter }) => (
    <Input label="Email" onChangeText={fieldValueSetter('email')} />
  ));
 */
const withFieldValueSetter = createSetter((fieldName, { setFieldValue }) => value => (
  setFieldValue(fieldName, value)
), 'fieldValueSetter');

// withFieldTouchedSetter
// usage:
/**
  const MyForm = compose(
    formik(...),
    withFieldTouchedSetter,
  )(({ fieldTouchedSetter }) => (
    <Input label="Email" onBlur={fieldTouchedSetter('email')} />
  ));
 */
const withFieldTouchedSetter = createSetter((fieldName, { setFieldTouched }) => () => (
  setFieldTouched(fieldName, true)
), 'fieldTouchedSetter');

export { withFieldValueSetter, withFieldTouchedSetter };
