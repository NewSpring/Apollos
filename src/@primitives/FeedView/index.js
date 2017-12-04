import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  pure,
  compose,
  branch,
  renderComponent,
  componentFromProp,
} from 'recompose';
import { map } from 'lodash';

import { Link } from '@modules/NativeWebRouter';
import { getLinkPath } from '@utils/content';
import FeedItemCard from '@primitives/FeedItemCard';
import FeedList from './FeedList';

const defaultFeedItemRenderer = ({ item }) => { // eslint-disable-line
  // console.log(item.content.colors.length ? item.content.colors : null);
  return (
    <Link to={getLinkPath(item)}>
      <FeedItemCard
        title={item.title}
        category={item.category}
        images={item.content.images}
        backgroundColor={item.content.colors.length ? `#${item.content.colors[0].value}` : null}
        isLight={item.content.isLight}
      />
    </Link>
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
