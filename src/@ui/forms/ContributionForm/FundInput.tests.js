import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';

import FundInput from './FundInput';

describe('The FrequencyInput component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FundInput
          funds={[{ id: 0, label: 'my fund!' }, { id: 1, label: 'my other fund!' }]}
          value={{ value: 50, id: 0 }}
          onChange={jest.fn()}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with initial state', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FundInput
          funds={[{ id: 0, label: 'my fund!' }, { id: 1, label: 'my other fund!' }]}
          value={null}
          onChange={jest.fn()}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly as the first fund input', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FundInput
          isFirst
          funds={[{ id: 0, label: 'my fund!' }, { id: 1, label: 'my other fund!' }]}
          value={{ value: 50, id: 0 }}
          onChange={jest.fn()}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
