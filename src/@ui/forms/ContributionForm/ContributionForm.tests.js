import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Providers from '@ui/TestProviders';

import { ContributionFormWithoutData } from './index';

const createTestData = () => ({
  isOffline: false,
  funds: [{ id: 'one', name: 'sterling' }, { id: 'two', name: 'platinum' }],
  offlineContactEmail: 'offline@contact.email',
  offlineMessageBody: 'offline message body',
  offlineMessageTitle: 'offline message title',
  createFieldValueHandler: jest.fn(),
  handleSubmit: jest.fn(),
  values: {
    secondFundVisible: false,
    firstContribution: {
      id: 'one',
      amount: 14,
    },
    secondContribution: null,
    frequencyId: 'today',
    startDate: moment('12/19/2017').toDate(),
  },
  touched: {
    secondFundVisible: false,
    firstContribution: false,
    secondContribution: false,
    frequencyId: false,
    startDate: false,
  },
  errors: {
    secondFundVisible: null,
    firstContribution: null,
    secondContribution: null,
    frequencyId: null,
    startDate: null,
  },
  createFieldTouchedHandler: jest.fn(),
  isSubmitting: false,
  isValid: false,
});

describe('The ContributionForm component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers>
        <ContributionFormWithoutData {...createTestData()} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('shows the second fund', () => {
    const data = createTestData();
    data.values.secondFundVisible = true;

    const tree = renderer.create(
      <Providers>
        <ContributionFormWithoutData {...data} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('shows the offline message', () => {
    const data = createTestData();
    data.isOffline = true;

    const tree = renderer.create(
      <Providers>
        <ContributionFormWithoutData {...data} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('shows the recurring options', () => {
    const data = createTestData();
    data.values.frequencyId = 'monthly';

    const tree = renderer.create(
      <Providers>
        <ContributionFormWithoutData {...data} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('shows a second contribution', () => {
    const data = createTestData();
    data.values.secondContribution = {
      id: 'two',
      amount: 23,
    };

    const tree = renderer.create(
      <Providers>
        <ContributionFormWithoutData {...data} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('shows an error with no funds', () => {
    const data = createTestData();
    data.values.funds = [];

    const tree = renderer.create(
      <Providers>
        <ContributionFormWithoutData {...data} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
