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

    getSetter = (fieldName, ...otherArgs) => {
      if (!this.setters[fieldName]) {
        this.setters[fieldName] = getSetter(fieldName, { ...this.props }, ...otherArgs);
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
    withFieldValueHandler,
  )(({ createFieldValueHandler }) => (
    <Input label="Email" onChangeText={createFieldValueHandler('email')} />
  ));
 */
const withFieldValueHandler = createSetter((fieldName, { setFieldValue }, transform) => (value) => {
  let valueToSet = value;
  if (transform) valueToSet = transform(valueToSet);
  return setFieldValue(fieldName, valueToSet);
}, 'createFieldValueHandler');

// withFieldTouchedHandler
// usage:
/**
  const MyForm = compose(
    formik(...),
    withFieldTouchedHandler,
  )(({ createFieldTouchedHandler }) => (
    <Input label="Email" onBlur={createFieldTouchedHandler('email')} />
  ));
 */
const withFieldTouchedHandler = createSetter((fieldName, { setFieldTouched }) => () => (
  setFieldTouched(fieldName, true)
), 'createFieldTouchedHandler');

export { withFieldValueHandler, withFieldTouchedHandler };
