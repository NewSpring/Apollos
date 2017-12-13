import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import Category from './';

describe('the FeedItemCard Category component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Category type={'Default'} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as a Series', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Category type={'Series'} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as Albums', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Category type={'Albums'} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
