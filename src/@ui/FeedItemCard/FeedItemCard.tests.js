import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import FeedItemCard from './';

describe('the FeedItemCard component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FeedItemCard
          title={'Boom'}
          image={'https://picsum.photos/600/400/?random'}
          category={'What'}
          isLight
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with inverted font colors', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FeedItemCard
          title={'Boom'}
          image={'https://picsum.photos/600/400/?random'}
          category={'What'}
          isLight={false}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept a different card color', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FeedItemCard
          title={'Boom'}
          image={'https://picsum.photos/600/400/?random'}
          category={'What'}
          cardColor={'salmon'}
          isLight={false}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as liked', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FeedItemCard
          title={'Boom'}
          image={'https://picsum.photos/600/400/?random'}
          category={'What'}
          isLight
          isLiked
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const cardDimensions = {
      height: 400,
      width: '92%',
    };

    const tree = renderer.create(
      <ThemeProvider>
        <FeedItemCard
          title={'Boom'}
          image={'https://picsum.photos/600/400/?random'}
          category={'What'}
          style={cardDimensions}
          isLight
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
