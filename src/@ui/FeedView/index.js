import React from 'react';
import { Text, View } from 'react-native';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import { Link } from '@ui/NativeWebRouter';
import { getLinkPath } from '@utils/content';
import { pure, compose, branch, renderComponent, componentFromProp } from 'recompose';
import FeedList from './FeedList';

// TODO: replace weith component from #40
const defaultFeedItemRenderer = ({ item }) => ( // eslint-disable-line
  <Link to={getLinkPath(item)}>
    <View style={{ height: 250, margin: 10, backgroundColor: 'rgba(0,0,0,0.1)' }}>
      <Text>{item.title}</Text>
      <Text>{item.category}</Text>
    </View>
  </Link>
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
  branch(({ isLoading, content }) => isLoading && !content.length, renderEmptyState),
);

const FeedView = enhance(({
  isLoading,
  refetch,
  content,
  fetchMore,
  ...otherProps
}) => (
  <FeedList
    {...otherProps}
    refreshing={isLoading}
    onRefresh={refetch}
    onEndReached={fetchMore}
    data={content}
  />
));

FeedView.defaultProps = {
  isLoading: false,
  onEndReachedThreshold: 0.7,
  keyExtractor: item => item.entryId,
  content: [],
  refetch: undefined,
  fetchMore: undefined,
  renderItem: defaultFeedItemRenderer,
  renderEmptyState: defaultEmptyStateRenderer,
};

FeedView.propTypes = {
  isLoading: PropTypes.bool,
  content: PropTypes.array, // eslint-disable-line
  refetch: PropTypes.func,
  fetchMore: PropTypes.func,
  renderItem: PropTypes.func,
  renderEmptyState: PropTypes.func,
};

export default FeedView;
