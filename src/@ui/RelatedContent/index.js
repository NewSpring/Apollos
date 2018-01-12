import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, branch, withProps, setPropTypes, defaultProps } from 'recompose';

import withRelatedContent from '@data/withRelatedContent';
import { Link } from '@ui/NativeWebRouter';
import { getLinkPath } from '@utils/content';
import styled from '@ui/styled';
import { H5 } from '@ui/typography';
import ThumbnailCard from '@ui/ThumbnailCard';

const generateLoadingStateData = (numberOfItems = 1) => {
  const itemData = () => ({
    id: 'fakeId0',
    title: '',
    channelName: '',
    content: {
      images: [],
    },
    isLoading: true,
  });

  const loadingStateData = [itemData()];

  while (loadingStateData.length < numberOfItems) {
    const newData = itemData();
    newData.id = `fakeId${loadingStateData.length}`;
    loadingStateData.push(newData);
  }

  return loadingStateData;
};

const enhance = compose(
  pure,
  withRelatedContent,
  setPropTypes({
    excludedIds: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    isLoading: PropTypes.bool,
  }),
  defaultProps({
    isLoading: false,
    sectionTitle: 'More Like This',
  }),
  branch(({ isLoading, data }) => isLoading && !data.length, withProps({
    data: generateLoadingStateData(3),
    fetchMore: false,
  })),
);

const renderItems = (taggedContent) => {
  // console.log(taggedContent);
  let items = null;

  if (taggedContent !== undefined) {
    items = taggedContent.map(item => (
      <Link to={getLinkPath(item)}>
        <ThumbnailCard
          title={item.title}
          category={item.channelName}
          image={'https://picsum.photos/400/400/?random'}
          key={item.id}
        />
      </Link>
    ));
  }

  return items;
};

const Wrapper = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
}))(View);

const Title = styled(({ theme }) => ({
  textAlign: 'center',
  paddingBottom: theme.sizing.baseUnite,
}))(H5);

const RelatedContent = enhance(({
  sectionTitle,
  data,
  isLoading,
}) => (
  <Wrapper>
    <Title><H5>{sectionTitle}</H5></Title>
    {renderItems(data.taggedContent)}
  </Wrapper>
));

export default RelatedContent;
