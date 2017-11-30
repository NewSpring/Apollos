import React from 'react';
import renderer from 'react-test-renderer';
import FeedView from '../';

describe('The FeedView component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <FeedView
        content={[
          { entryId: '1', title: 'hi', channelName: 'bob' },
          { entryId: '2', title: 'hi 2', channelName: 'bob 2' },
        ]}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders empty state', () => {
    const tree = renderer.create(
      <FeedView
        isLoading
        content={[]}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
