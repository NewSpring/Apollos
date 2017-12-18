import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import FeedView from '../';

describe('The FeedView component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FeedView
          content={[
            {
              entryId: '1',
              title: 'hi',
              category: 'bob',
              content: {
                images: [{
                  uri: 'https://picsum.photos/600/400/?random',
                  width: 600,
                  height: 400,
                }],
                colors: [],
                isLight: true,
              },
            },
            {
              entryId: '2',
              title: 'hi 2',
              category: 'bob 2',
              content: {
                images: [{
                  uri: 'https://picsum.photos/600/400/?random',
                  width: 600,
                  height: 400,
                }],
                colors: [{
                  value: '584068',
                }],
                isLight: true,
              },
            },
          ]}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders empty state', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FeedView
          isLoading
          content={[]}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
