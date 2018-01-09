import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import FeedItemCard from './';

describe('the FeedItemCard component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <FeedItemCard
          title={'Boom'}
          category={'What'}
          images={[{
              uri: 'https://picsum.photos/600/400/?random',
              width: 600,
              height: 400,
            }]}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with inverted (light) font colors', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept a different backgroundColor', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render text correctly with isLight', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as liked', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const cardDimensions = {
      height: 400,
      width: '92%',
    };

    const tree = renderer.create(
      <Providers>
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
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
