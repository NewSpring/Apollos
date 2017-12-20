import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';

import { BillingAddressFormWithoutData } from './BillingAddressForm';

const createTestData = () => ({
  isLoading: false,
  onSubmit: jest.fn(),
  setFieldValue: jest.fn(),
  countries: [
    {
      id: 'US',
      label: 'Testing Country',
    },
    {
      id: 'FOREIGN',
      label: 'A foreign country',
    },
  ],
  states: [{
    id: 'SC',
    label: 'Testing State',
  }],
  values: {
    countryId: 'US',
    stateId: 'testState',
    street1: 'My Street',
    street2: '',
    city: 'My City',
    zipCode: '12345',
  },
  isSubmitting: false,
  isValid: true,
  errors: { },
  touched: {
    countryId: false,
    stateId: false,
    street1: false,
    street2: false,
    city: false,
    zipCode: false,
  },
});

describe('The ContributionForm component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <BillingAddressFormWithoutData {...createTestData()} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders a loading indicator', () => {
    const data = createTestData();
    data.isLoading = true;
    const tree = renderer.create(
      <ThemeProvider>
        <BillingAddressFormWithoutData {...data} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('hides state field for foreign countries', () => {
    const data = createTestData();
    data.values.countryId = 'FOREIGN';
    const tree = renderer.create(
      <ThemeProvider>
        <BillingAddressFormWithoutData {...data} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
