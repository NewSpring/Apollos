import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import AccountCard from './';

describe('the AccountCard component', () => {
  it('should render with title', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <AccountCard
          title="My Account"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with accountNumber', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <AccountCard
          title="My Account"
          accountNumber="12341234"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render accountType:bankAccount', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <AccountCard
          title="My Account"
          accountNumber="12341234"
          accountType="bankAccount"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render accountType:creditCard', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <AccountCard
          title="My Account"
          accountNumber="12341234"
          accountType="creditCard"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render allow changing iconSize', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <AccountCard
          title="My Account"
          accountNumber="12341234"
          accountType="creditCard"
          iconSize={20}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

