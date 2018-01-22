import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import ScheduleCard from './';

describe('the ScheduleCard component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <ScheduleCard
          accountName="accountName"
          amount={20}
          frequency="often"
          startDate="02/02/2020"
          iconSize={20}
          dateFormat="lll"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

