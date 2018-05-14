import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';

import { withFieldValueHandler, withFieldTouchedHandler } from './formikSetters';

describe('The withFieldValueHandler HOC', () => {
  it('passes in a createFieldValueHandler function', () => {
    const HOC = withFieldValueHandler(View);
    const tree = renderer.create(<HOC />);
    expect(tree).toMatchSnapshot();
  });
  it('to create a handler that calls setFieldValue', () => {
    const setter = jest.fn();
    const TestComponent = ({ createFieldValueHandler }) => {
      expect(createFieldValueHandler).toBeDefined();
      const handler = createFieldValueHandler('testField');
      handler('someValue');
      expect(setter.mock.calls.length).toBe(1);
      return null;
    };
    const EnhancedTestComponent = withFieldValueHandler(TestComponent);
    renderer.create(<EnhancedTestComponent setFieldValue={setter} />);
  });
  it('allows you to pass in a transform function', () => {
    const setter = jest.fn();
    const transform = jest.fn().mockReturnValue('transform');
    const TestComponent = ({ createFieldValueHandler }) => {
      expect(createFieldValueHandler).toBeDefined();
      const handler = createFieldValueHandler('testField', transform);
      handler('someValue');
      expect(setter.mock.calls.length).toBe(1);
      expect(setter).toHaveBeenCalledWith('testField', 'transform');
      expect(transform.mock.calls.length).toBe(1);
      expect(transform).toHaveBeenCalledWith('someValue');
      return null;
    };
    const EnhancedTestComponent = withFieldValueHandler(TestComponent);
    renderer.create(<EnhancedTestComponent setFieldValue={setter} />);
  });
});

describe('The withFieldTouchedHandler HOC', () => {
  it('passes in a createFieldTouchedHandler function', () => {
    const HOC = withFieldTouchedHandler(View);
    const tree = renderer.create(<HOC />);
    expect(tree).toMatchSnapshot();
  });
  it('to create a handler that calls setFieldTouched', () => {
    const setter = jest.fn();
    const TestComponent = ({ createFieldTouchedHandler }) => {
      expect(createFieldTouchedHandler).toBeDefined();
      const handler = createFieldTouchedHandler('testField');
      handler('someValue');
      expect(setter.mock.calls.length).toBe(1);
      return null;
    };
    const EnhancedTestComponent = withFieldTouchedHandler(withFieldValueHandler(TestComponent));
    renderer.create(<EnhancedTestComponent setFieldTouched={setter} />);
  });
});
