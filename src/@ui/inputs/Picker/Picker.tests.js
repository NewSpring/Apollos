import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import Picker, { Item } from './';

describe('The Picker Input component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Picker
          placeholder="Select a language..."
          label="Languages"
        >
          <Item label="Java" value="java" />
          <Item label="JavaScript" value="js" />
        </Picker>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
