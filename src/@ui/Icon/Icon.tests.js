import React from 'react';
import renderer from 'react-test-renderer';
import { kebabCase } from 'lodash';
import Icon from './';
import * as icons from './icons';

Object.keys(icons).forEach((iconName) => {
  describe(`The ${iconName} icon`, () => {
    it('renders correctly', () => {
      const tree = renderer.create(<Icon name={kebabCase(iconName)} />);
      expect(tree).toMatchSnapshot();
    });
  });
});
