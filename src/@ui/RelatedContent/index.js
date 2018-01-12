import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, branch, withProps, setPropTypes, defaultProps } from 'recompose';
import { get, times } from 'lodash';

import withRelatedContent from '@data/withRelatedContent';
import { Link } from '@ui/NativeWebRouter';
import { getLinkPath } from '@utils/content';
import { withThemeMixin } from '@ui/theme';
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

  const loadingStateData = { taggedContent: [] };
  times(numberOfItems, (n) => {
    const newData = itemData();
    newData.id = `fakeId${n}`;
    loadingStateData.taggedContent.push(newData);
  });

  return loadingStateData;
};

const getItemImages = (item) => {
  let images = get(item, 'content.images', []);
  if (!images.length) images = get(item, 'parent.content.images', [{}]);
  return images[0].url; // TODO short circuit. Highliner should handle image selection in the array
};

const enhance = compose(
  pure,
  setPropTypes({
    excludedIds: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    isLoading: PropTypes.bool,
  }),
  defaultProps({
    isLoading: false,
    sectionTitle: 'More Like This',
  }),
  withRelatedContent,
  branch(({ isLoading, data }) => (isLoading && data.taggedContent !== 'undefined'), withProps({
    data: generateLoadingStateData(3),
  })),
  withThemeMixin(() => ({
    type: 'light',
  })),
);

const renderItems = (data) => {
  let items = null;
  if (data.taggedContent !== undefined) {
    items = data.taggedContent.map(item => (
      <Link to={getLinkPath(item)} key={item.id}>
        <ThumbnailCard
          title={item.title}
          category={item.channelName}
          image={getItemImages(item)}
          isLoading={item.isLoading}
        />
      </Link>
    ));
  }

  return items;
};

const Wrapper = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
  backgroundColor: theme.colors.lightSecondary,
}))(View);

const Title = styled(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.sizing.baseUnit / 2,
}))(H5);

const RelatedContent = enhance(({
  sectionTitle,
  data,
}) => (
  <Wrapper>
    <Title>{sectionTitle}</Title>
    {renderItems(data)}
  </Wrapper>
));

export default RelatedContent;
