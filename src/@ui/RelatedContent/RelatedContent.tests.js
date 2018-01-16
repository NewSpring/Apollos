import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '@ui/TestProviders';

import RelatedContentWithoutData from './RelatedContentWithoutData';

describe('The RelatedContent component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers>
        <RelatedContentWithoutData
          tags={['boom', 'what']}
          excludedIds={['1']}
          content={[
            {
              id: '1',
              title: 'hi',
              channelName: 'bob',
              content: {
                images: [{
                  uri: 'https://picsum.photos/600/400/?random',
                  width: 600,
                  height: 400,
                }],
              },
            },
            {
              id: '2',
              title: 'hi 2',
              category: 'bob 2',
              content: {
                images: [{
                  uri: 'https://picsum.photos/600/400/?random',
                  width: 600,
                  height: 400,
                }],
              },
            },
            {
              id: '3',
              title: 'hi 3',
              category: 'bob 3',
              content: {
                images: [{
                  uri: 'https://picsum.photos/600/400/?random',
                  width: 600,
                  height: 400,
                }],
              },
            },
          ]}
          isLoading={false}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders empty state', () => {
    const tree = renderer.create(
      <Providers>
        <RelatedContentWithoutData
          tags={['boom', 'what']}
          excludeIds={['1']}
          content={[]}
          isLoading
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
