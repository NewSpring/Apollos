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
          category={'What'}
          images={[{
            uri: 'https://picsum.photos/600/400/?random',
            width: 600,
            height: 400,
          }]}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with inverted (light) font colors', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FeedItemCard
          title={'Boom'}
          category={'What'}
          images={[{
            uri: 'https://picsum.photos/600/400/?random',
            width: 600,
            height: 400,
          }]}
          isLight={false}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept a different backgroundColor', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FeedItemCard
          title={'Boom'}
          category={'What'}
          images={[{
            uri: 'https://picsum.photos/600/400/?random',
            width: 600,
            height: 400,
          }]}
          backgroundColor={'salmon'}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render text correctly with isLight', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FeedItemCard
          title={'Boom'}
          category={'What'}
          images={[{
            uri: 'https://picsum.photos/600/400/?random',
            width: 600,
            height: 400,
          }]}
          isLight
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
          category={'What'}
          images={[{
            uri: 'https://picsum.photos/600/400/?random',
            width: 600,
            height: 400,
          }]}
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
          category={'What'}
          images={[{
            uri: 'https://picsum.photos/600/400/?random',
            width: 600,
            height: 400,
          }]}
          style={cardDimensions}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
