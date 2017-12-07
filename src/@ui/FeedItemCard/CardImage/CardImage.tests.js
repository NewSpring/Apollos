import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import CardImage from './';

describe('the FeedItemCard Category component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardImage source={'https://picsum.photos/600/400/?random'} overlayColor={'#ffffff'} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
