import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import RelatedContentCard from './RelatedContentCard';

describe('the RelatedContentCard component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <RelatedContentCard
          title={'Why Jesus is Timeless'}
          image={'https://picsum.photos/100/100/?random'}
          category={'Time Travel'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state', () => {
    const tree = renderer.create(
      <Providers>
        <RelatedContentCard
          title={''}
          image={''}
          isLoading
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
