import React from 'react';
import { Text, View } from 'react-native';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import { pure, compose, branch, renderComponent, componentFromProp } from 'recompose';
import FeedList from './FeedList';

// TODO: replace weith component from #40
const defaultFeedItemRenderer = ({ item }) => ( // eslint-disable-line
  <View style={{ height: 250, margin: 10, backgroundColor: 'rgba(0,0,0,0.1)' }}>
    <Text>{item.title}</Text>
    <Text>{item.channelName}</Text>
  </View>
);

// TODO: replace with component from #115
const defaultEmptyStateRenderer = () => map([1, 2, 3], key => (
  <View key={key} style={{ height: 250, margin: 10, backgroundColor: 'rgba(0,0,0,0.1)' }}>
    <Text>...</Text>
  </View>
));

const renderEmptyState = renderComponent(componentFromProp('renderEmptyState'));

const enhance = compose(
  pure,
  branch(({ isLoading, feed }) => isLoading && !feed.length, renderEmptyState),
);

const FeedView = enhance(({
  isLoading,
  refetch,
  feed,
  fetchMore,
  ...otherProps
}) => (
  <FeedList
    {...otherProps}
    refreshing={isLoading}
    onRefresh={refetch}
    onEndReached={fetchMore}
    data={feed}
  />
));

FeedView.defaultProps = {
  isLoading: false,
  onEndReachedThreshold: 0.7,
  keyExtractor: item => item.entryId,
  feed: [],
  refetch: undefined,
  fetchMore: undefined,
  renderItem: defaultFeedItemRenderer,
  renderEmptyState: defaultEmptyStateRenderer,
};

FeedView.propTypes = {
  isLoading: PropTypes.bool,
  feed: PropTypes.array, // eslint-disable-line
  refetch: PropTypes.func,
  fetchMore: PropTypes.func,
  renderItem: PropTypes.func,
  renderEmptyState: PropTypes.func,
};

export default FeedView;
