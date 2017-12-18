import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import CardImage from './';

describe('the FeedItemCard CardImage component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardImage source={[{
            uri: 'https://picsum.photos/600/400/?random',
            width: 600,
            height: 400,
          }]}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with an overlayColor', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardImage
          source={[{
            uri: 'https://picsum.photos/600/400/?random',
            width: 600,
            height: 400,
          }]}
          overlayColor={'salmon'}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
