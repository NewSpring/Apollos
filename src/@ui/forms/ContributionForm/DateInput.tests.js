import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import { ThemeProvider } from '@ui/theme';

import DateInput from './DateInput';

describe('The DateInput component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <DateInput value={moment('01/01/2015').toDate()} onChange={jest.fn()} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
