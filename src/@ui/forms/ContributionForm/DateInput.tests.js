import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Providers from '@ui/TestProviders';

import DateInput from './DateInput';

describe('The DateInput component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <DateInput value={moment('01/01/2015').toDate()} onChange={jest.fn()} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
