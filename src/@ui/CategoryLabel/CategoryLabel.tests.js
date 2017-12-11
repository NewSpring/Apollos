import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import Category from './';

describe('the FeedItemCard Category component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Category type={'Series'} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
