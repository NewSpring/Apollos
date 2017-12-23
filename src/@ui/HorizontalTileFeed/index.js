import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, branch, withProps, setPropTypes, defaultProps } from 'recompose';

import { Link } from '@ui/NativeWebRouter';
import { getLinkPath } from '@utils/content';
import CardTile from '@ui/CardTile';

const generateLoadingStateData = (numberOfItems = 1) => {
  const itemData = () => ({
    title: '',
    category: '',
    content: {
      images: [],
      backgroundColor: null,
      isLight: null,
    },
    isLoading: true,
    entryId: 'fakeId0',
  });

  const loadingStateData = [itemData()];

  while (loadingStateData.length < numberOfItems) {
    const newData = itemData();
    newData.entryId = `fakeId${loadingStateData.length}`;
    loadingStateData.push(newData);
  }

  return loadingStateData;
};

const defaultItemRenderer = ({ item }) => console.log(item) || ( // eslint-disable-line
  <Link to={getLinkPath(item)}>
    {/* <CardTile
      number={}
      title={'Sermon Title'}
      byLine={'Marty McFly'}
      date={'10/30/2017'}
      isLoading
    /> */}
  </Link>
);

const enhance = compose(
  pure,
  branch(({ isLoading, content }) => isLoading && !content.length, withProps({
    content: generateLoadingStateData(10),
    fetchMore: false,
  })),
  setPropTypes({
    isLoading: PropTypes.bool,
    content: PropTypes.array, // eslint-disable-line
    refetch: PropTypes.func,
    fetchMore: PropTypes.func,
    renderItem: PropTypes.func,
    numColumns: PropTypes.number,
  }),
  defaultProps({
    renderItem: defaultItemRenderer,
    content: [],
    isLoading: false,
  }),
);

const HorizontalTileFeed = enhance(({
  content,
  isLoading,
  ...otherProps
}) => (
  <FlatList
    renderItem={defaultItemRenderer}
    data={content}
    // keyExtractor={({ item }) => item.entryId}
    // getItemLayout={(data, index) => ({ length, offset, index })}
    horizontal
    initialScrollIndex={0}
    pagingEnabled
    refreshing={isLoading}
    showsHorizontalScrollIndicator
    showsVerticalScrollIndicator={false}
    {...otherProps}
  />
));

export default HorizontalTileFeed;
