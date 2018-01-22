import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import ExpiringAccountCard from './';

describe('the ExpiringAccountCard component', () => {
  it('should render with name, expirationDate, dateFormat, onPress, and iconFill', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <ExpiringAccountCard
          name="Bank Account"
          expirationDate="02/02/2020"
          dateFormat="lll"
          onPress={() => {}}
          iconFill="#ffffff"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

