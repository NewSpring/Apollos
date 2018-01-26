import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import CashAmountIndicator from './';

describe('the CashAmountIndicator component', () => {
  it('should render a number', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CashAmountIndicator
          amount={2}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a decimal', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CashAmountIndicator
          amount={2.22}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render accept different sizes', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CashAmountIndicator
          amount={2.22}
          size={2}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

