import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';

import FrequencyInput from './FrequencyInput';

describe('The FrequencyInput component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FrequencyInput value="biweekly" onChange={jest.fn()} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
