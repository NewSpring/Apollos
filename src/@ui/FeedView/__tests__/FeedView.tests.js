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
                  url: 'https://placeholdit.co//i/600x400?text=:`-( No Image In Array!',
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
                  url: 'https://placeholdit.co//i/600x400?text=:`-( No Image In Array!',
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
