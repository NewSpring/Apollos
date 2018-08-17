import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Providers from '@ui/TestProviders';

import DateInput from './';

describe('The DateInput component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <DateInput
          value={moment.utc('1/1/2015').toDate()}
          minimumDate={moment.utc('1/1/2015').toDate()}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a displayValue', () => {
    const tree = renderer.create(
      <Providers>
        <DateInput
          value={moment.utc('1/1/2015').toDate()}
          displayValue={moment.utc('1/1/2015').format('YYYY/MM/DD')}
          minimumDate={moment.utc('1/1/2015').toDate()}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a placeholder', () => {
    const tree = renderer.create(
      <Providers>
        <DateInput
          placeholder={'mm/dd/yyyy'}
          value={moment.utc('1/1/2015').toDate()}
          minimumDate={moment.utc('1/1/2015').toDate()}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a label', () => {
    const tree = renderer.create(
      <Providers>
        <DateInput
          value={moment.utc('1/1/2015').toDate()}
          displayValue={moment.utc('1/1/2015').format('YYYY/MM/DD')}
          minimumDate={moment.utc('1/1/2015').toDate()}
          label={'Date Label'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
