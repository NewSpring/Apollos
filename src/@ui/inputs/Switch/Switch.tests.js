import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import Switch from './';

describe('The Picker Input component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Switch label="Some label text" />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
