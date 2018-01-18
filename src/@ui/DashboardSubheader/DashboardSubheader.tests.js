import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import DashboardSubheader from './';

describe('the DashboardSubheader component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <DashboardSubheader
          text="title text"
          buttonText="click action"
          onPress={() => {}}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

