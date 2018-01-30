import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Providers from '@ui/TestProviders';

import DateInput from './';

describe('The DateInput component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <DateInput value={moment('1/1/2015').utc().toDate()} onChange={jest.fn()} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
