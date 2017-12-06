import React from 'react';
import renderer from 'react-test-renderer';
import { kebabCase } from 'lodash';
import { ThemeProvider } from '@ui/theme';
import Icon from './';
import * as icons from './icons';

Object.keys(icons).forEach((iconName) => {
  describe(`The ${iconName} icon`, () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <ThemeProvider>
          <Icon name={kebabCase(iconName)} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
