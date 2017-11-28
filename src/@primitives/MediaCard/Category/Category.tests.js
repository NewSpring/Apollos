import React from 'react';
import renderer from 'react-test-renderer';

import ThemeProvider from '@primitives/ThemeProvider';
import Category from './';

describe('the MediaCard Category component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Category type={'Series'} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
