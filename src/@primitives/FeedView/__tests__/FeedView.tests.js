import React from 'react';
import renderer from 'react-test-renderer';
import FeedView from '../';

describe('The FeedView component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <FeedView
        feed={[
          { entryId: '1', title: 'hi', category: 'bob' },
          { entryId: '2', title: 'hi 2', category: 'bob 2' },
        ]}
      />,
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
