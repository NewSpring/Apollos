import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import { PersonalDetailsFormWithoutData } from './PersonalDetailsForm';

const createTestData = () => ({
  createFieldValueHandler: jest.fn(),
  handleSubmit: jest.fn(),
  values: {
    campusId: 'one',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email@email.com',
  },
  createFieldTouchedHandler: jest.fn(),
  errors: {
    campusId: null,
    firstName: null,
    lastName: null,
    email: null,
  },
  touched: {
    campusId: false,
    firstName: false,
    lastName: false,
    email: false,
  },
  isSubmitting: false,
  isValid: false,
  campuses: [{
    id: 'one',
    label: 'My campus',
  }],
});

describe('The PaymentForm component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers>
        <PersonalDetailsFormWithoutData {...createTestData()} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('shows a submitting state', () => {
    const data = createTestData();
    data.isSubmitting = true;
    const tree = renderer.create(
      <Providers>
        <PersonalDetailsFormWithoutData {...data} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
