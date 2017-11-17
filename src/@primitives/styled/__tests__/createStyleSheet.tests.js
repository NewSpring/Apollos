import React from 'react';

import { View } from 'react-native';
import renderer from 'react-test-renderer';
import createStyleSheet, { cachedStyles } from '../createStyleSheet';

describe('the createStyleSheet function', () => {
  it('returns styles that work on components', () => {
    const style = createStyleSheet({ backgroundColor: 'red' });
    const tree = renderer.create(<View style={style} />);
    expect(tree).toMatchSnapshot();
  });
  it('uses a style cache when using same style twice', () => {
    const style = { backgroundColor: 'red' };
    const a = createStyleSheet(style);
    const b = createStyleSheet(style);
    expect(a).toEqual(b);
    expect(Object.keys(cachedStyles)).toHaveLength(1);
  });
  it('doesnt fail when passed an already generated style', () => {
    const style = createStyleSheet(0); // simulating StyleSheet.create() used elsewhere
    expect(style).toEqual(0);
  });
  it('returns a single style if possible', () => {
    const style = createStyleSheet([{ backgroundColor: 'red' }]);
    expect(Array.isArray(style)).toBeFalsy();
  });
});
