import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import TileFeed from './';

describe('The TileFeed component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <TileFeed
          content={[
            {
              id: 'fakeId0',
              title: 'Why Jesus is Timeless',
              meta: {
                date: 'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)', // this snapshot will expire in a year
              },
              content: {
                speaker: 'Marty McFly',
              },
            },
            {
              id: 'fakeId1',
              title: 'Why Jesus is Timeless',
              meta: {
                date: 'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)', // this snapshot will expire in a year
              },
              content: {
                speaker: 'Marty McFly',
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
        <TileFeed
          isLoading
          content={[]}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
