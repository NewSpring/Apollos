import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import ThumbnailCard from './';

describe('the ThumbnailCard component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <ThumbnailCard
          title={'Why Jesus is Timeless'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with an images', () => {
    const tree = renderer.create(
      <Providers>
        <ThumbnailCard
          title={'Why Jesus is Timeless'}
          images={'https://picsum.photos/100/100/?random'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a category', () => {
    const tree = renderer.create(
      <Providers>
        <ThumbnailCard
          title={'Why Jesus is Timeless'}
          category={'Time Travel'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a category and images', () => {
    const tree = renderer.create(
      <Providers>
        <ThumbnailCard
          title={'Why Jesus is Timeless'}
          images={'https://picsum.photos/100/100/?random'}
          category={'Time Travel'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state', () => {
    const tree = renderer.create(
      <Providers>
        <ThumbnailCard
          title={'Why Jesus is Timeless'}
          images={'https://picsum.photos/100/100/?random'}
          category={'Time Travel'}
          isLoading
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
