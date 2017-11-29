import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import {
  pure,
  compose,
  branch,
  renderComponent,
  componentFromProp,
} from 'recompose';

import MediaCard from '@primitives/MediaCard';
import FeedList from './FeedList';

const defaultFeedItemRenderer = ({ item }) => { // eslint-disable-line
  console.log(item.content.isLight);
  return (
    <MediaCard
      title={item.title}
      category={item.channelName}
      image={item.content.images.length ?
        `https:${item.content.images[0].url}` :
        'https://placeholdit.co//i/600x400?text=:`-( No Image In Array!'
      }
      cardColor={item.content.colors.length ? `#${item.content.colors[0].value}` : ''}
      isLight={item.content.isLight}
    />
  );
};

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
