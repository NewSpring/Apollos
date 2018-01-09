import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import FrequencyInput from './FrequencyInput';

describe('The FrequencyInput component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <FrequencyInput value="biweekly" onChange={jest.fn()} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
