import React from 'react';
import renderer from 'react-test-renderer';

import ThemeProvider from '@primitives/ThemeProvider';
import FeedView from '../';

describe('The FeedView component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FeedView
          feed={[
            {
              entryId: '1',
              title: 'hi',
              channelName: 'bob',
              content: {
                images: [{
                  url: 'https://placeholdit.co//i/600x400?text=:`-( No Image In Array!',
                }],
                colors: [],
              },
            },
            {
              entryId: '2',
              title: 'hi 2',
              channelName: 'bob 2',
              content: {
                images: [{
                  url: 'https://placeholdit.co//i/600x400?text=:`-( No Image In Array!',
                }],
                colors: [{
                  value: 'fff',
                }],
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
      <FeedView
        isLoading
        feed={[]}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
